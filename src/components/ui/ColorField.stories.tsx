import type { Meta } from "@storybook/react";
import type React from "react";
import { ColorField } from "./ColorField";

const meta: Meta<typeof ColorField> = {
  component: ColorField,
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

export const Example = (args: React.ComponentProps<typeof ColorField>) => (
  <ColorField {...args} />
);
