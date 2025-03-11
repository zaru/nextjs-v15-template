import { Button } from "@/components/ui/Button";
import { addToastQueue } from "@/components/ui/GlobalToastRegion";
import type { Meta, StoryFn } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
  decorators: [(Story) => <Story />],
};

export default meta;

export const Default: StoryFn = () => {
  return (
    <Button
      type="button"
      onPress={() =>
        addToastQueue({
          status: "success",
          message: "設定を変更しました。",
        })
      }
    >
      Toastを表示
    </Button>
  );
};
