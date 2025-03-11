import type { Meta } from "@storybook/react";
import React from "react";
import type { ColorSwatchPickerProps } from "react-aria-components";
import { ColorSwatchPicker, ColorSwatchPickerItem } from "./ColorSwatchPicker";

const meta: Meta<typeof ColorSwatchPicker> = {
  component: ColorSwatchPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: Omit<ColorSwatchPickerProps, "layout">) => (
  <ColorSwatchPicker {...args}>
    <ColorSwatchPickerItem color="#A00" />
    <ColorSwatchPickerItem color="#f80" />
    <ColorSwatchPickerItem color="#080" />
    <ColorSwatchPickerItem color="#08f" />
    <ColorSwatchPickerItem color="#088" />
    <ColorSwatchPickerItem color="#008" />
  </ColorSwatchPicker>
);
