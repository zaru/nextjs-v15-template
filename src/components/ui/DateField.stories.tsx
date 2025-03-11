import type { Meta } from "@storybook/react";
import type React from "react";
import { Form } from "react-aria-components";
import { Button } from "./Button";
import { DateField } from "./DateField";

const meta: Meta<typeof DateField> = {
  component: DateField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Event date",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof DateField>) => (
  <DateField {...args} />
);

export const Validation = (args: React.ComponentProps<typeof DateField>) => (
  <Form className="flex flex-col gap-2 items-start">
    <DateField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
