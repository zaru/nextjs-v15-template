import type { Meta } from "@storybook/react";
import type React from "react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ToggleButton>) => (
  <ToggleButton {...args}>Pin</ToggleButton>
);
