import type { Meta } from "@storybook/react";
import type React from "react";
import { ColorSwatch } from "./ColorSwatch";

const meta: Meta<typeof ColorSwatch> = {
  component: ColorSwatch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ColorSwatch>) => (
  <ColorSwatch {...args} />
);

Example.args = {
  color: "#f00a",
};
