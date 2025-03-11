"use client";

import { deleteSample } from "@/app/sample/_actions/deleteSample";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import type { Sample } from "@prisma/client";
import { type FormEvent, startTransition, useActionState } from "react";
import { requestFormReset } from "react-dom";

interface Props {
  sample: Sample;
}

export function SampleItem(props: Props) {
  const initialState = {
    success: null,
    payload: {
      id: props.sample.id,
    },
    errors: {},
  };

  const [state, action, isPending] = useActionState(deleteSample, initialState);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(() => {
      action(formData);
    });
  };

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
