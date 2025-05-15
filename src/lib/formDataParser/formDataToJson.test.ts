import { formDataToJson } from "@/lib/formDataParser/formDataToJson";
import { describe, expect, it } from "vitest";

describe("formDataToJson", () => {
  // テストケースを配列として定義
  // [テスト名, FormDataに追加するキーと値のペア, 期待される結果]
  const cases: [string, [string, string][], object][] = [
    [
      "simple key-value pairs",
      [
        ["id", "1"],
        ["name", "test"],
      ],
      {
        id: "1",
        name: "test",
      },
    ],
    [
      "nested objects using dot notation",
      [
        ["user.name", "John"],
        ["user.age", "30"],
      ],
      {
        user: {
          name: "John",
          age: "30",
        },
      },
    ],
    [
      "arrays using [] notation",
      [
        ["tags[]", "tag1"],
        ["tags[]", "tag2"],
        ["tags[]", "tag3"],
      ],
      {
        tags: ["tag1", "tag2", "tag3"],
      },
    ],
    [
      "arrays of objects using [] notation",
      [
        ["reports[0].id", "1"],
        ["reports[0].content", "Report 1"],
        ["reports[1].id", "2"],
        ["reports[1].content", "Report 2"],
      ],
      {
        reports: [
          { id: "1", content: "Report 1" },
          { id: "2", content: "Report 2" },
        ],
      },
    ],
    [
      "complex combinations of nested objects and arrays",
      [
        ["id", "1"],
        ["user.name", "John"],
        ["user.age", "30"],
        ["user.tags[]", "tag1"],
        ["user.tags[]", "tag2"],
        ["tags[]", "main1"],
        ["tags[]", "main2"],
        ["reports[0].id", "1"],
        ["reports[0].content", "Report 1"],
        ["reports[1].id", "2"],
        ["reports[1].content", "Report 2"],
      ],
      {
        id: "1",
        user: {
          name: "John",
          age: "30",
          tags: ["tag1", "tag2"],
        },
        tags: ["main1", "main2"],
        reports: [
          { id: "1", content: "Report 1" },
          { id: "2", content: "Report 2" },
        ],
      },
    ],
  ];

  // it.eachを使って各テストケースを実行
  it.each(cases)("should convert %s", (_, formDataEntries, expected) => {
    // FormDataを作成して各エントリを追加
    const formData = new FormData();
    for (const [key, value] of formDataEntries) {
      formData.append(key, value);
    }

    // 関数を実行して結果を検証
    const result = formDataToJson(formData);
    expect(result).toEqual(expected);
  });
});
