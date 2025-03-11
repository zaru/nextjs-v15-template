import type { Meta } from "@storybook/react";
import type React from "react";
import { GridList, GridListItem } from "./GridList";

const meta: Meta<typeof GridList> = {
  component: GridList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof GridList>) => (
  <GridList aria-label="Ice cream flavors" {...args}>
    <GridListItem id="chocolate">Chocolate</GridListItem>
    <GridListItem id="mint">Mint</GridListItem>
    <GridListItem id="strawberry">Strawberry</GridListItem>
    <GridListItem id="vanilla">Vanilla</GridListItem>
  </GridList>
);

Example.args = {
  onAction: null,
  selectionMode: "multiple",
};

export const DisabledItems = (args: React.ComponentProps<typeof GridList>) => (
  <Example {...args} />
);
DisabledItems.args = {
  ...Example.args,
  disabledKeys: ["mint"],
};
