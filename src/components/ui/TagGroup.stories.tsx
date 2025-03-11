import type { Meta } from "@storybook/react";
import type React from "react";
import { Tag, TagGroup } from "./TagGroup";

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof TagGroup>) => (
  <TagGroup {...args}>
    <Tag>Chocolate</Tag>
    <Tag isDisabled>Mint</Tag>
    <Tag>Strawberry</Tag>
    <Tag>Vanilla</Tag>
  </TagGroup>
);

Example.args = {
  label: "Ice cream flavor",
  selectionMode: "single",
};
