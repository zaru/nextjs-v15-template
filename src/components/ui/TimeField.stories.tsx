import type { Meta } from "@storybook/react";
import type React from "react";
import { Form } from "react-aria-components";
import { Button } from "./Button";
import { TimeField } from "./TimeField";

const meta: Meta<typeof TimeField> = {
  component: TimeField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Event time",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof TimeField>) => (
  <TimeField {...args} />
);

export const Validation = (args: React.ComponentProps<typeof TimeField>) => (
  <Form className="flex flex-col gap-2 items-start">
    <TimeField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
