import type React from "react";
import { Calendar } from "./Calendar";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Calendar>) => (
  <Calendar aria-label="Event date" {...args} />
);
