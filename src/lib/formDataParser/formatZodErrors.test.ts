import { formatZodErrors } from "@/lib/formDataParser/formatZodErrors";
import { describe, expect, it } from "vitest";
import type { ZodIssue } from "zod";

// テストデータを簡易にするためZodIssueではなくテスト用の型を定義する
type ZodIssueLike = {
  type?: "string" | "array";
  expected?: "string" | "array";
  path: (string | number)[];
  message: string;
};

describe("formatZodErrors", () => {
  const cases: [string, ZodIssueLike[], Record<string, string[]>][] = [
    [
      "string (type)",
      [{ type: "string", path: ["a", "b", "c"], message: "text" }],
      { "a.b.c": ["text"] },
    ],
    [
      "string (expected)",
      [{ expected: "string", path: ["a", "b", "c"], message: "text" }],
      { "a.b.c": ["text"] },
    ],
    [
      "array (type)",
      [{ type: "array", path: ["a", "b", "c"], message: "text" }],
      { "a.b.c[]": ["text"] },
    ],
    [
      "array (expected)",
      [{ expected: "array", path: ["a", "b", "c"], message: "text" }],
      { "a.b.c[]": ["text"] },
    ],
    [
      "numeric segment in middle",
      [{ type: "string", path: ["a", 0, "b"], message: "text" }],
      { "a[0].b": ["text"] },
    ],
    [
      "numeric segment in middle + array type",
      [{ type: "array", path: ["a", 0, "b"], message: "text" }],
      { "a[0].b[]": ["text"] },
    ],
    [
      "numeric segment at tail",
      [{ type: "string", path: ["a", 0, "b", 0], message: "text" }],
      { "a[0].b[]": ["text"] },
    ],
    [
      "numeric segment at tail",
      [{ type: "string", path: ["a", 0, "b", 0, "c"], message: "text" }],
      { "a[0].b[0].c": ["text"] },
    ],
    [
      "duplicate keys accumulate messages",
      [
        { type: "string", path: ["a"], message: "one" },
        { expected: "string", path: ["a"], message: "two" },
      ],
      { a: ["one", "two"] },
    ],
  ];

  it.each(cases)("%s", (_, input, expected) => {
    expect(formatZodErrors(input as ZodIssue[])).toEqual(expected);
  });
});
