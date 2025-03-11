"use client";

import type { CreateSamplePayload } from "@/app/sample/_actions/createSample";
import type { UploadSamplePayload } from "@/app/sample/_actions/updateSample";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import { type FormSubmitResult, useToastedForm } from "@/hooks/useToastedForm";

// 新規作成と更新処理のどちらかを受け取るUnion型
type UnionPayload = CreateSamplePayload | UploadSamplePayload;

interface Props<T> {
  action: (formData: FormData) => Promise<FormSubmitResult<T>>;
  initialPayload: T;
}

export function CommonForm<T extends UnionPayload>(props: Props<T>) {
  const { state, handleSubmit, isPending } = useToastedForm<T>({
    submitAction: props.action,
    initialPayload: props.initialPayload,
    options: {
      resetOnSuccess: !("id" in props.initialPayload),
    },
  });

  return (
    <Form onSubmit={handleSubmit} validationErrors={state.errors}>
      <div className="mb-2">
        {"id" in state.payload && (
          <TextField
            aria-label="id"
            type="hidden"
            name="id"
            defaultValue={`${state.payload.id}`}
          />
        )}
        <TextField
          label="内容"
          aria-label="content"
          name="content"
          defaultValue={state.payload.content}
        />
      </div>
      <Button type="submit" isPending={isPending}>
        更新
      </Button>
    </Form>
  );
}
