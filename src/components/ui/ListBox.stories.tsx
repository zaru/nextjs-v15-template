import type { Meta } from "@storybook/react";
import type React from "react";
import { ListBox, ListBoxItem } from "./ListBox";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ListBox>) => (
  <ListBox aria-label="Ice cream flavor" {...args}>
    <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
    <ListBoxItem id="mint">Mint</ListBoxItem>
    <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
    <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
  </ListBox>
);

Example.args = {
  onAction: null,
  selectionMode: "multiple",
};

export const DisabledItems = (args: React.ComponentProps<typeof ListBox>) => (
  <Example {...args} />
);
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["mint"],
};
