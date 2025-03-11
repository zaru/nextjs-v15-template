"use client";

import { type Payload, deleteSample } from "@/app/sample/_actions/deleteSample";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import { useToastedForm } from "@/hooks/useToastedForm";
import type { Sample } from "@prisma/client";

interface Props {
  sample: Sample;
}

export function SampleItem(props: Props) {
  const { state, handleSubmit, isPending } = useToastedForm<Payload>({
    submitAction: deleteSample,
    initialPayload: {
      id: props.sample.id,
    },
    options: {
      resetOnSuccess: true,
    },
  });

  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div className="font-medium">{props.sample.content}</div>
      <div>
        <Form onSubmit={handleSubmit} validationErrors={state.errors}>
          <TextField
            aria-label="id"
            type="hidden"
            name="id"
            defaultValue={`${state.payload.id}`}
          />
          <Button type="submit" isPending={isPending} variant="destructive">
            削除
          </Button>
        </Form>
      </div>
    </div>
  );
}
