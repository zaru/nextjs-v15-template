import type { Meta } from "@storybook/react";
import type React from "react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Switch>) => (
  <Switch {...args}>Wi-Fi</Switch>
);
