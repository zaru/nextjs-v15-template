import type { Meta } from "@storybook/react";
import type React from "react";
import { Form } from "react-aria-components";
import { Button } from "./Button";
import { NumberField } from "./NumberField";

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Cookies",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof NumberField>) => (
  <NumberField {...args} />
);

export const Validation = (args: React.ComponentProps<typeof NumberField>) => (
  <Form className="flex flex-col gap-2 items-start">
    <NumberField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
