import type { Meta } from "@storybook/react";
import type React from "react";
import { Form } from "react-aria-components";
import { Button } from "./Button";
import { SearchField } from "./SearchField";

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Search",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof SearchField>) => (
  <SearchField {...args} />
);

export const Validation = (args: React.ComponentProps<typeof SearchField>) => (
  <Form className="flex flex-col gap-2 items-start">
    <SearchField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
