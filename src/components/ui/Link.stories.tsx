import type { Meta } from "@storybook/react";
import type React from "react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Link>) => (
  <Link {...args}>The missing link</Link>
);

Example.args = {
  href: "https://www.imdb.com/title/tt6348138/",
  target: "_blank",
};
