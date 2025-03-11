import type { Meta } from "@storybook/react";
import type React from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Slider>) => (
  <Slider {...args} />
);

Example.args = {
  label: "Range",
  defaultValue: [30, 60],
  thumbLabels: ["start", "end"],
};
