"use server";

import { prisma } from "@/lib/prisma";
import type { FormResultType } from "@/lib/type";
import { revalidatePath } from "next/cache";
import { parseFormData } from "parse-nested-form-data";
import { z } from "zod";

const schema = z.object({
  id: z.coerce.number().min(1),
});

type SchemaType = typeof schema;
type Payload = FormResultType<SchemaType>["payload"];

export async function deleteSample(
  _prev: FormResultType<SchemaType>,
  formData: FormData,
): Promise<FormResultType<SchemaType>> {
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
      errors: {
        id: ["削除に失敗しました"],
      },
    };
  }

  return {
    success: true,
    payload: parsed.data,
    errors: {},
  };
}
