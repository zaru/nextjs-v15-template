import type { ZodIssue } from "zod";

export type FormattedErrors = Record<string, string[]>;

function hasTypeOrExpected(
  issue: ZodIssue,
): issue is ZodIssue & { type?: string; expected?: string } {
  return "type" in issue || "expected" in issue;
}

/**
 * Zod の Issue 配列を FormData フレンドリな形へ整形する
 *
 * @example
 * ```ts
 * const result = formatZodErrors([
 *   { type: "string", path: ["a", 0, "b"], message: "text" },
 * ]);
 * // => { "a[0].b": ["text"] }
 * ```
 */
export function formatZodErrors(issues: ZodIssue[]): FormattedErrors {
  const out: FormattedErrors = {};

  for (const issue of issues) {
    if (!hasTypeOrExpected(issue)) {
      continue;
    }

    const { path, message } = issue;
    const isArrayType = issue.type === "array" || issue.expected === "array";

    let key = "";

    path.forEach((segment, idx) => {
      const isLast = idx === path.length - 1;

      if (typeof segment === "number") {
        // 数値セグメント → インデックス表現
        if (isLast) {
          // 末尾なら "[]" だけ (番号は付けない)
          key += "[]";
        } else {
          key += `[${segment}]`;
        }
      } else {
        // 文字列セグメント
        if (key !== "" && !key.endsWith("[]")) {
          key += ".";
        }
        key += segment;
      }
    });

    // 型が array 指定なら末尾に "[]" を重複しないように付加
    if (isArrayType && !key.endsWith("[]")) key += "[]";

    // message を配列にまとめる
    if (!out[key]) {
      out[key] = [];
    }
    out[key].push(message);
  }

  return out;
}
