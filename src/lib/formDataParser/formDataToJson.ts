/**
 * FormDataから変換されるJSONの値の型
 */
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

/**
 * FormDataから変換されるJSONオブジェクトの型
 */
interface JsonObject {
  [key: string]: JsonValue;
}

/**
 * FormDataから変換されるJSON配列の型
 */
type JsonArray = JsonValue[];

/**
 * ネストされたオブジェクトの現在の参照位置を表す型
 */
type NestedObject = {
  [key: string]: JsonValue | NestedObject;
};

/**
 * FormDataをJSONに変換する
 *
 * - .はオブジェクトのネスト区切り
 *   - 例: foo.bar.baz => { foo: { bar: { baz: "value" } } }
 * - 末尾に[]があれば配列にする
 *   - 例: foo.bar[] => { foo: { bar: ["value1", "value2"] } }
 * - [n]という形式のフォーマットも配列にする
 *  - 例:
 *    foo.bar[0].baz
 *    foo.bar[1].baz
 *      => { foo: { bar: [ { baz: "value1" },{ baz: "value2" } ] } }
 *
 * @param formData 変換するFormDataオブジェクト
 * @returns 変換されたJSONオブジェクト
 */
export function formDataToJson(formData: FormData): JsonObject {
  const result: JsonObject = {};

  for (const [key, value] of formData.entries()) {
    // FormDataの値を文字列として扱う（Fileの場合はファイル名を使用）
    const stringValue = value instanceof File ? value.name : String(value);
    const isArray = key.endsWith("[]");

    // [n]形式の配列インデックスを含むパスを処理するための準備
    const processedPath: { key: string; arrayIndex?: number }[] = [];

    // キーを.で分割し、[n]形式の配列インデックスを検出
    const segments = (isArray ? key.slice(0, -2) : key).split(".");

    for (const segment of segments) {
      const arrayIndexMatch = segment.match(/^(.+)\[(\d+)\]$/);
      if (arrayIndexMatch) {
        // [n]形式の配列インデックスを検出した場合
        const [, arrayKey, indexStr] = arrayIndexMatch;
        processedPath.push({
          key: arrayKey,
          arrayIndex: Number.parseInt(indexStr, 10),
        });
      } else {
        processedPath.push({ key: segment });
      }
    }

    let current: NestedObject = result;

    for (let i = 0; i < processedPath.length; i++) {
      const { key: pathKey, arrayIndex } = processedPath[i];
      const isLast = i === processedPath.length - 1;

      if (arrayIndex !== undefined) {
        // 配列が存在しない場合は作成
        if (!Array.isArray(current[pathKey])) {
          current[pathKey] = [] as JsonArray;
        }

        // 配列の指定されたインデックスにアクセス
        const array = current[pathKey] as JsonArray;

        // インデックスの位置にオブジェクトがない場合は作成
        while (array.length <= arrayIndex) {
          array.push({});
        }

        if (isLast && isArray) {
          // 最後の要素で、かつ[]形式の場合（例: foo[0][]）
          if (!Array.isArray(array[arrayIndex])) {
            array[arrayIndex] = [] as JsonArray;
          }
          (array[arrayIndex] as JsonArray).push(stringValue);
        } else if (isLast) {
          // 最後の要素の場合、値を設定
          array[arrayIndex] = stringValue;
        } else {
          // 中間要素の場合、次のネストレベルに進む
          if (
            typeof array[arrayIndex] !== "object" ||
            Array.isArray(array[arrayIndex])
          ) {
            array[arrayIndex] = {};
          }
          current = array[arrayIndex] as NestedObject;
        }
      } else if (isLast) {
        if (isArray) {
          // 配列が存在しない場合は作成
          if (!Array.isArray(current[pathKey])) {
            current[pathKey] = [] as JsonArray;
          }
          // 型アサーションを使用して配列として扱う
          (current[pathKey] as JsonArray).push(stringValue);
        } else {
          current[pathKey] = stringValue;
        }
      } else {
        // 次のネストレベルのオブジェクトが存在しない場合は作成
        if (
          !current[pathKey] ||
          typeof current[pathKey] !== "object" ||
          Array.isArray(current[pathKey])
        ) {
          current[pathKey] = {};
        }
        // 型アサーションを使用して次のネストレベルに進む
        current = current[pathKey] as NestedObject;
      }
    }
  }

  return result as JsonObject;
}
