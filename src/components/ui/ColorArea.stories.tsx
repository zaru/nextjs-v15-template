import type { Meta } from "@storybook/react";
import type React from "react";
import { ColorArea } from "./ColorArea";

const meta: Meta<typeof ColorArea> = {
  component: ColorArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof ColorArea>) => (
  <ColorArea {...args} />
);
