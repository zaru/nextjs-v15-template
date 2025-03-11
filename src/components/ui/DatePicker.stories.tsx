import type { Meta } from "@storybook/react";
import React from "react";
import { type DateValue, Form } from "react-aria-components";
import { Button } from "./Button";
import { DatePicker, type DatePickerProps } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Event date",
  },
};

export default meta;

export const Example = (args: DatePickerProps<DateValue>) => (
  <DatePicker {...args} />
);

export const Validation = (args: DatePickerProps<DateValue>) => (
  <Form className="flex flex-col gap-2 items-start">
    <DatePicker {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
