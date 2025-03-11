"use server";

import type { FormSubmitResult } from "@/hooks/useToastedForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { parseFormData } from "parse-nested-form-data";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().min(1),
});

export type DeleteSamplePayload = z.infer<typeof schema>;

export async function deleteSample(
  formData: FormData,
): Promise<FormSubmitResult<DeleteSamplePayload>> {
  // FormDataをパースしてObjectにする
  const data = parseFormData(formData);
  // Zodでバリデーションを行ってから値を使う
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      payload: data as DeleteSamplePayload,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.sample.delete({
      where: {
        id: parsed.data.id,
      },
    });

    revalidatePath("/sample");
  } catch (error) {
    console.log(error);
    return {
      success: false,
      payload: parsed.data,
      toastMessage: "削除に失敗しました",
    };
  }

  return {
    success: true,
    payload: parsed.data,
    toastMessage: "削除しました",
  };
}
