import type { Meta } from "@storybook/react";
import type React from "react";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "./Disclosure";

const meta: Meta<typeof Disclosure> = {
  component: Disclosure,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Disclosure>) => (
  <Disclosure {...args}>
    <DisclosureHeader>Files</DisclosureHeader>
    <DisclosurePanel>Files content</DisclosurePanel>
  </Disclosure>
);
