"use server";

import type { FormSubmitResult } from "@/hooks/useToastedForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseFormData } from "parse-nested-form-data";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, "内容を入力してください"),
});

export type Payload = z.infer<typeof schema>;

export async function createSample(
  formData: FormData,
): Promise<FormSubmitResult<Payload>> {
  // FormDataをパースしてObjectにする
  const data = parseFormData(formData);
  // Zodでバリデーションを行ってから値を使う
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      payload: data as Payload,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.sample.create({
      data: {
        content: parsed.data.content,
      },
    });

    revalidatePath("/sample");
  } catch (error) {
    console.log(error);
    return {
      success: false,
      payload: parsed.data,
      toastMessage: "登録に失敗しました",
    };
  }

  return {
    success: true,
    payload: { content: "" },
    toastMessage: "登録しました",
  };
}
