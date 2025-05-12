# FormDataとZodの取り扱い標準化について

## 要約

- Next.jsのフォーム実装方法を明確にし、標準化する
- FormDataの記法とZodスキーマ定義方法の提案する
- 今使っている `parse-nested-form-data (parseFormData)` を削除する

### 作成する共通処理

- `formDataToJson` : FormDataからJSONオブジェクトに変換する
- `formatErrorMessage` : Zodのエラーメッセージをフロントで扱いやすいように変換する

これらの関数名や分割粒度は暫定です。今後の議論や実装をしていく中で変わっていく前提です。

## モチベーション

- いろんなフォームがあり、ある程度は共通化されているもののエッジケースでは対応方法が変わっている
    - 途中からプロジェクトに参加するメンバーが迷わない状態を作りたい
- `parse-nested-form-data` が非常にリッチなため、データ変換なども行える（これ自体は良いが）
    - ただし、FormDataのnameに依存するためZodとの相性が悪く、ハック的な対応になりがち
    - このハック対応が隠蔽されているなら良いが、今は露出してしまっているので嫌な匂いがする
    - `parse-nested-form-data` と部分的に互換性をもたせたオリジナルのFormData to JSONパースライブラリを作る
      - 要は型変換の機能をOmitしたい 
- Zodのスキーマ定義と、複雑なFormData name構造が乖離している
    - これにより、エラーメッセージの表示をさせるのに、ちょっとした工夫が必要にある
    - 一定のルールに基づいてエラーメッセージの構造を、FormDataと一致させるオリジナルライブラリを作る

### Zodエラーメッセージ乖離の課題

例えば、以下のようなFormDataとZodスキーマがあるとする

```js
const schema = z.object({
  favorites: z.array(z.string().min(1)).min(1)
});
```

`parse-nested-form-data` は name の末尾に `[]` を付けた場合、配列として扱うように変換する

```html
<input type="checkbox" name="favorites[]" value="kindA" />
<input type="checkbox" name="favorites[]" value="kindB" />
```

この時、何もチェックを付けていないFormDataをZodでパースし、`parsed.error.flatten().fieldErrors` で取得できるエラーメッセージは以下の構造になる

```js
{
  favorites: [ 'エラーメッセージ' ]
}
```

このエラーメッセージを表示したいが、 JSONのキーが INPUTの `name` と違うため表示ができない

- INPUT name `favorites[]`
- エラー JSON `favorites`

このようなキー名の乖離が発生するパターンがいくつもあるため、エラーメッセージを表示するのに工夫が必要になる

# FormDataの記法プロポーザル

- 必要最低限、しかしformrunで利用する十分なケースに対応する記法を考えた

## オブジェクト記法

- `.` ドットで区切る
- オブジェクトのネストも同様に `.` で区切る

```
foo.id=100
foo.title=title
foo.nested.bar=value
```

```json
{
  "foo": {
    "id": "100",
    "title": "title",
    "nested": {
      "bar": "value"
    }
  }
}
```

## オブジェクト配列記法

- has-many形式で使うケース
- 配列の添字 `[0]` は単純なIndexを採用する
    - DBのIDを利用するケースを検討したが、IDが未確定の新規レコード対応が複雑になるためやめた
    - 添字の省略記法 `[]` はサポートしない
- 原則 `FieldList` コンポーネントを使って実現する

```
foo[0].id=100
foo[0].title=title100
foo[1].id=101
foo[1].title=title101
foo[1]._destroy=true
foo[2].id=
foo[2].title=new title
```

```json
{
  "foo": [
    {
      "id": "100",
      "title": "title100"
    },
    {
      "id": "101",
      "title": "title101",
      "_destroy": "true" // 既存リソースを削除する場合の特別フラグ
    },
    {
      "id": "", // FormDataではNULLはないので空文字列になる・パース時にNULLにするかどうかは要検討
      "title": "new title"
    }
  ]
}
```


## 配列記法

- 単純な配列は、添字の省略記法 `[]` のみサポート 
- チェックボックスなどで利用することを想定 

```
foo[]=kindA
foo[]=kindB
```

```json
{
  "foo": [
    "kindA",
    "kindB"
  ]
}
```

## 実装例

新しく作る2つの共通処理を利用する実装例を示す

- `formDataToJson` : FormDataからJSONオブジェクトに変換する
- `formatErrorMessage` : Zodのエラーメッセージをフロントで扱いやすいように変換する

```ts
"use server";

import { formDataToJson, formatErrorMessage } from "@/lib/formDataParser";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  user: z.object({
    name: z.string().min(1),
    contact: z.object({
      email: z.string().email(),
      phone: z.string().min(1),
    }),
  }),
  reports: z.array(
          z.object({
            id: z.union([z.string().nullable(), z.coerce.number()]),
            content: z.string().min(5),
            _destroy: z.coerce.boolean().optional(),
          }),
  ),
  favorites: z.array(z.string().min(1).max(6)).min(1),
  agreement: z.coerce.boolean().refine((val) => val, {
    message: "同意してください",
  }),
});
export type Payload = z.infer<typeof schema>;
export type Report = Payload["reports"][number];

export async function submit(formData: FormData) {
  // FormDataをJSONに変換
  const data = formDataToJson(formData);

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      payload: data as unknown as Payload,
      // Zodのエラーメッセージを整形
      errors: formatErrorMessage(parsed.error.errors),
      toastMessage: "入力内容を確認してください",
    };
  }

  return {
    success: true,
    payload: parsed.data,
    toastMessage: "送信しました",
  };
}
```

送信されるFormData構造

```
title=Title
user.name=Name
user.contact.email=user@example.com
user.contact.phone=00-0000-0000
reports[0].id=100
reports[0]._destroy=false
reports[0].content=ReportA
reports[1].id=
reports[1]._destroy=false
reports[1].content=ReportB
favorites[]=apple
favorites[]=banana
agreement=true
```

`formDataToJson` でパースされたオブジェクト構造

```js
{
  title: 'Title',
  user: {
    name: 'Name',
    contact: { email: 'user@example.com', phone: '00-0000-0000' }
  },
  reports: [
    { id: '100', _destroy: 'false', content: 'ReportA' },
    { id: '', _destroy: 'false', content: 'ReportB' }
  ],
  favorites: [ 'apple', 'banana' ],
  agreement: 'true'
}
```

- 文字列から数値や真偽値への変換は必要であればZodで行う


## 確認すべきこと

- Booleanなフォームデータの仕様を標準化すべきか
    - FormDataのnameに依存する変換仕様は避けたい
    - もしやるならZodパース時の変換処理共通化
- Checkboxのチェックを外したケースをサポートすべきか
    - 明示的に外したというフラグがあったほうが扱いやすい？
