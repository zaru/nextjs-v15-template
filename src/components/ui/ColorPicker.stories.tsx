import type { Meta } from "@storybook/react";
import type React from "react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Color",
    defaultValue: "#ff0",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ColorPicker>) => (
  <ColorPicker {...args} />
);
