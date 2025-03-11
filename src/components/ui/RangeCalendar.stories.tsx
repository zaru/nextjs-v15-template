import type { Meta } from "@storybook/react";
import type React from "react";
import { RangeCalendar } from "./RangeCalendar";

const meta: Meta<typeof RangeCalendar> = {
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof RangeCalendar>) => (
  <RangeCalendar aria-label="Trip dates" {...args} />
);
