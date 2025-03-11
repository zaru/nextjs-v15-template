"use client";

import { Button } from "@/components/ui/Button";
import type { QueuedToast } from "@react-stately/toast";
import { CircleX } from "lucide-react";
import {
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as ToastContent,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import type { ToastType } from "./GlobalToastRegion";

interface ToastProps {
  toast: QueuedToast<ToastType>;
}

const toastVariant = tv({
  base: "max-w-xs text-sm text-white rounded-xl shadow-xl flex px-5 py-1.5 items-center gap-4",
  variants: {
    status: {
      success: "bg-gray-500",
      error: "bg-red-500",
    },
  },
});

export function Toast({ toast }: ToastProps) {
  return (
    <AriaToast
      toast={toast}
      className={toastVariant({ status: toast.content.status })}
      style={{ viewTransitionName: toast.key }}
    >
      <ToastContent>
        <span>{toast.content.message}</span>
      </ToastContent>
      <Button type="button" variant="icon" slot="close" className="shadow-none">
        <CircleX className="text-white" />
      </Button>
    </AriaToast>
  );
}
