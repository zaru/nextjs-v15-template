import type { FormSubmitResult } from "@/hooks/useToastedForm";
import { formDataToJson } from "@/lib/formDataParser/formDataToJson";
import type { ZodTypeAny, z } from "zod";
import { formatZodErrors } from "./formDataParser/formatZodErrors";

export function createZodValidatedAction<
  Schema extends ZodTypeAny,
  Payload = z.infer<Schema>,
>(
  schema: Schema,
  action: (
    parsedPayload: Payload,
    formData: FormData,
  ) => Promise<FormSubmitResult<Payload>>,
) {
  return async (formData: FormData): Promise<FormSubmitResult<Payload>> => {
    const data = formDataToJson(formData);

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        payload: data as unknown as Payload,
        errors: formatZodErrors(parsed.error.errors),
        toastMessage: "入力内容を確認してください",
      };
    }

    return action(parsed.data, formData);
  };
}
