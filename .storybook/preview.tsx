import "../src/app/globals.css";
import type { Preview } from "@storybook/react";
import { GlobalToastRegion } from "../src/components/ui/GlobalToastRegion";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <div>
        <Story />
        <GlobalToastRegion />
      </div>
    ),
  ],
};

export default preview;
