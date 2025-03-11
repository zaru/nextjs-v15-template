"use server";

import type { FormSubmitResult } from "@/hooks/useToastedForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseFormData } from "parse-nested-form-data";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().min(1),
  content: z.string().min(1, "内容を入力してください"),
});

export type UploadSamplePayload = z.infer<typeof schema>;

export async function updateSample(
  formData: FormData,
): Promise<FormSubmitResult<UploadSamplePayload>> {
  // FormDataをパースしてObjectにする
  const data = parseFormData(formData);
  // Zodでバリデーションを行ってから値を使う
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      payload: data as UploadSamplePayload,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.sample.update({
      where: {
        id: parsed.data.id,
      },
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
      toastMessage: "更新に失敗しました",
    };
  }

  return {
    success: true,
    payload: { id: parsed.data.id, content: parsed.data.content },
    toastMessage: "更新しました",
  };
}
