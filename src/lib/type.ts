import type { z } from "zod";

export type FormResultType<T extends z.ZodTypeAny> = {
  success: boolean | null;
  payload: z.infer<T>;
  errors: z.inferFlattenedErrors<T>["fieldErrors"];
};
