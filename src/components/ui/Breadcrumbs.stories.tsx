import React from "react";
import type { BreadcrumbsProps } from "react-aria-components";
import { Breadcrumb, Breadcrumbs } from "./Breadcrumbs";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: BreadcrumbsProps<object>) => (
  <Breadcrumbs {...args}>
    <Breadcrumb href="/">Home</Breadcrumb>
    <Breadcrumb href="/react-aria">React Aria</Breadcrumb>
    <Breadcrumb>Breadcrumbs</Breadcrumb>
  </Breadcrumbs>
);
