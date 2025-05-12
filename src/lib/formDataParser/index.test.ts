import { describe, expect, it } from "vitest";
import type { ZodIssue } from "zod";
import { formDataToJson, formatErrorMessage } from "./index";

// formDataToJsonのテスト
describe("formDataToJson", () => {
  // 基本的な変換テスト
  it("should convert simple key-value pairs", () => {
    const formData = new FormData();
    formData.append("id", "1");
    formData.append("name", "test");

    const result = formDataToJson(formData);

    expect(result).toEqual({
      id: "1",
      name: "test",
    });
  });

  // ネストされたオブジェクトの変換テスト
  it("should convert nested objects using dot notation", () => {
    const formData = new FormData();
    formData.append("user.name", "John");
    formData.append("user.age", "30");

    const result = formDataToJson(formData);

    expect(result).toEqual({
      user: {
        name: "John",
        age: "30",
      },
    });
  });

  // 配列の変換テスト
  it("should convert arrays using [] notation", () => {
    const formData = new FormData();
    formData.append("tags[]", "tag1");
    formData.append("tags[]", "tag2");
    formData.append("tags[]", "tag3");

    const result = formDataToJson(formData);

    expect(result).toEqual({
      tags: ["tag1", "tag2", "tag3"],
    });
  });

  // オブジェクトの配列の変換テスト
  it("should convert arrays of objects using [] notation", () => {
    const formData = new FormData();
    formData.append("reports[0].id", "1");
    formData.append("reports[0].content", "Report 1");
    formData.append("reports[1].id", "2");
    formData.append("reports[1].content", "Report 2");

    const result = formDataToJson(formData);

    expect(result).toEqual({
      reports: [
        { id: "1", content: "Report 1" },
        { id: "2", content: "Report 2" },
      ],
    });
  });

  // 複合テスト
  it("should convert complex combinations of nested objects and arrays", () => {
    const formData = new FormData();
    formData.append("id", "1");
    formData.append("user.name", "John");
    formData.append("user.age", "30");
    formData.append("user.tags[]", "tag1");
    formData.append("user.tags[]", "tag2");
    formData.append("tags[]", "main1");
    formData.append("tags[]", "main2");
    formData.append("reports[0].id", "1");
    formData.append("reports[0].content", "Report 1");
    formData.append("reports[1].id", "2");
    formData.append("reports[1].content", "Report 2");

    const result = formDataToJson(formData);

    expect(result).toEqual({
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
    });
  });
});

// formatErrorMessageのテスト
describe("formatErrorMessage", () => {
  // 基本的なエラーメッセージのフォーマットテスト
  it("should format basic error messages", () => {
    const errors = [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["name"],
        message: "Required",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      name: "Required",
    });
  });

  // ネストされたオブジェクトのエラーメッセージのフォーマットテスト
  it("should format error messages for nested objects", () => {
    const errors = [
      {
        path: ["user", "name"],
        message: "Required",
        type: "string",
      },
      {
        path: ["user", "age"],
        message: "Must be a positive number",
        type: "number",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "user.name": "Required",
      "user.age": "Must be a positive number",
    });
  });

  // 配列タイプの場合は、キーの末尾に[]を追加
  it("should format error messages for arrays", () => {
    const errors = [
      {
        path: ["tags"],
        message: "Must contain at least 3 items",
        type: "array",
        expected: "array",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "tags[]": "Must contain at least 3 items",
    });
  });

  // pathの末尾が数値の場合は配列として扱う
  // ただし、インデックス指定されていたとしても個別要素のエラーではなく配列全体のエラーとして扱う
  it("should format error messages for arrays", () => {
    const errors = [
      {
        path: ["tags", "0"],
        message: "String must contain at most 3 characters",
        type: "string",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "tags[]": "String must contain at most 3 characters",
    });
  });

  // pathの途中に数値がある場合はオブジェクトの配列として扱う
  // この場合は配列の個別要素のエラーとして扱う
  it("should format error messages for arrays", () => {
    const errors = [
      {
        path: ["reports", "0", "content"],
        message: "String must contain at most 3 characters",
        type: "string",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "reports[0].content": "String must contain at most 3 characters",
    });
  });

  // オブジェクトの配列のエラーメッセージのフォーマットテスト
  it("should format error messages for arrays of objects", () => {
    const errors = [
      {
        path: ["reports", "0", "content"],
        message: "必須項目です",
        type: "string",
      },
      {
        path: ["reports", "1", "id"],
        message: "数値を入力してください",
        type: "number",
      },
      {
        path: ["reports", "2", "tags"],
        message: "少なくとも1つのタグが必要です",
        type: "array",
        expected: "array",
      },
      {
        path: ["reports", "2", "tags", "0"],
        message: "タグは3文字以上である必要があります",
        type: "string",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "reports[0].content": "必須項目です",
      "reports[1].id": "数値を入力してください",
      "reports[2].tags[]": "少なくとも1つのタグが必要です",
      "reports[2].tags[0]": "タグは3文字以上である必要があります",
    });
  });

  // 複合テスト
  it("should format error messages for complex combinations", () => {
    const errors = [
      {
        path: ["user", "name"],
        message: "Required",
        type: "string",
      },
      {
        path: ["user", "tags"],
        message: "Must contain at least 3 items",
        type: "array",
        expected: "array",
      },
      {
        path: ["tags", "0"],
        message: "String must contain at most 3 characters",
        type: "string",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "user.name": "Required",
      "user.tags[]": "Must contain at least 3 items",
      "tags[0]": "String must contain at most 3 characters",
    });
  });

  // ネストされたオブジェクトの配列のエラーメッセージのフォーマットテスト
  it("should format error messages for nested arrays of objects", () => {
    const errors = [
      {
        path: ["users", "0", "addresses", "0", "zipcode"],
        message: "郵便番号の形式が正しくありません",
        type: "string",
      },
      {
        path: ["users", "0", "addresses", "1", "city"],
        message: "必須項目です",
        type: "string",
      },
      {
        path: ["users", "1", "addresses"],
        message: "少なくとも1つの住所が必要です",
        type: "array",
        expected: "array",
      },
      {
        path: ["users", "2", "profile", "skills"],
        message: "少なくとも1つのスキルが必要です",
        type: "array",
        expected: "array",
      },
      {
        path: ["users", "2", "profile", "skills", "0"],
        message: "スキル名は空にできません",
        type: "string",
      },
    ];

    const result = formatErrorMessage(errors as ZodIssue[]);

    expect(result).toEqual({
      "users[0].addresses[0].zipcode": "郵便番号の形式が正しくありません",
      "users[0].addresses[1].city": "必須項目です",
      "users[1].addresses[]": "少なくとも1つの住所が必要です",
      "users[2].profile.skills[]": "少なくとも1つのスキルが必要です",
      "users[2].profile.skills[0]": "スキル名は空にできません",
    });
  });
});
