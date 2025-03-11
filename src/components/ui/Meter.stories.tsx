import type { Meta } from "@storybook/react";
import type React from "react";
import { Meter } from "./Meter";

const meta: Meta<typeof Meter> = {
  component: Meter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Meter>) => (
  <Meter {...args} />
);

Example.args = {
  label: "Storage space",
  value: 80,
};
