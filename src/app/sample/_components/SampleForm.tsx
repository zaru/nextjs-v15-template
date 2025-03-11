"use client";

import { type Payload, createSample } from "@/app/sample/_actions/createSample";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import { useToastedForm } from "@/hooks/useToastedForm";

export function SampleForm() {
  const { state, handleSubmit, isPending } = useToastedForm<Payload>({
    submitAction: createSample,
    initialPayload: {
      content: "",
    },
    options: {
      resetOnSuccess: true,
    },
  });

  return (
    <div className="mb-4 p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">新規サンプル追加</h2>
      <Form onSubmit={handleSubmit} validationErrors={state.errors}>
        <div className="mb-2">
          <TextField
            label="内容"
            aria-label="content"
            name="content"
            defaultValue={state.payload.content}
          />
        </div>
        <Button type="submit" isPending={isPending}>
          追加
        </Button>
        {state.success && (
          <div className="mt-2 text-green-600">登録しました</div>
        )}
      </Form>
    </div>
  );
}
