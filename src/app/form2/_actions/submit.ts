"use server";

import type { FormSubmitResult } from "@/hooks/useToastedForm";
import { createZodValidatedAction } from "@/lib/createZodValidatedAction";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  user: z.object({
    name: z.string().min(1, "名前を入力してください"),
    contact: z.object({
      email: z.string().email("メールアドレスを入力してください"),
      phone: z.string().min(1, "電話番号を入力してください"),
    }),
  }),
  reports: z.array(
    z.object({
      id: z.union([z.string().nullable(), z.coerce.number()]),
      content: z.string().min(5, "内容を5文字以上で入力してください"),
      _destroy: z.coerce.boolean().optional(),
    }),
  ),
  favorites: z.array(z.string().min(1).max(6)).min(1),
  agreement: z.coerce.boolean().refine((val) => val, {
    message: "同意してください",
  }),
});
export type Payload = z.infer<typeof schema>;

async function action(
  parsedPayload: Payload,
  formData: FormData,
): Promise<FormSubmitResult<Payload>> {
  console.log(parsedPayload, formData);

  if (Math.random() > 0.5) {
    return {
      success: false,
      payload: parsedPayload,
      toastMessage: "システムエラーです",
    };
  }

  return {
    success: true,
    payload: parsedPayload,
    toastMessage: "送信しました",
  };
}

export const submit = createZodValidatedAction(schema, action);
