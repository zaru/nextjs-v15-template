import React from "react";
import {
  Form as RACForm,
  type FormProps as RACFormProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

interface FormProps extends Omit<RACFormProps, "validationErrors"> {
  validationErrors?: Partial<Record<string, string[]>>;
}

export function Form({ className, validationErrors, ...props }: FormProps) {
  return (
    <RACForm
      {...props}
      validationErrors={validationErrors as Record<string, string[]>}
      className={twMerge("flex flex-col gap-4", className)}
    />
  );
}
