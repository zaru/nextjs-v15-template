import type { Meta } from "@storybook/react";
import type React from "react";
import { ColorSlider } from "./ColorSlider";

const meta: Meta<typeof ColorSlider> = {
  component: ColorSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ColorSlider>) => (
  <ColorSlider {...args} />
);

Example.args = {
  label: "Fill Color",
  channel: "hue",
  colorSpace: "hsl",
  defaultValue: "#f00",
};
