import type { Meta } from "@storybook/react";
import type React from "react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from "./Disclosure";

const meta: Meta<typeof DisclosureGroup> = {
  component: DisclosureGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof DisclosureGroup>) => (
  <DisclosureGroup {...args}>
    <Disclosure>
      <DisclosureHeader>Files</DisclosureHeader>
      <DisclosurePanel>Files content</DisclosurePanel>
    </Disclosure>
    <Disclosure>
      <DisclosureHeader>Images</DisclosureHeader>
      <DisclosurePanel>Images content</DisclosurePanel>
    </Disclosure>
    <Disclosure>
      <DisclosureHeader>Documents</DisclosureHeader>
      <DisclosurePanel>Documents content</DisclosurePanel>
    </Disclosure>
  </DisclosureGroup>
);
