"use client";

import { deleteSample } from "@/app/sample/_actions/deleteSample";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { TextField } from "@/components/ui/TextField";
import type { Sample } from "@prisma/client";
import { type FormEvent, startTransition, useActionState } from "react";

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
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  };

  return (
    <div>
      <div>{props.sample.content}</div>
      <div>
        <Form onSubmit={handleSubmit} validationErrors={state.errors}>
          <TextField
            aria-label="id"
            type="hidden"
            name="id"
            defaultValue={`${state.payload.id}`}
          />
          <Button type="submit" isPending={isPending}>
            削除
          </Button>
        </Form>
      </div>
    </div>
  );
}
