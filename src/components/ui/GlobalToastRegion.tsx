"use client";

import {
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { flushSync } from "react-dom";
import { Toast } from "./Toast";

export interface ToastType {
  status: "success" | "error";
  message: string;
}

const toastQueue = new ToastQueue<ToastType>({
  maxVisibleToasts: 5,
  // ViewTransitionアニメーション対応
  wrapUpdate(fn) {
    // SSR時あるいはViewTransition未対応ブラウザでは通常のflushSyncを使用
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      return fn();
    }
    document.startViewTransition(() => {
      flushSync(fn);
    });
  },
});

export function addToastQueue({ status, message }: ToastType) {
  if (!toastQueue.visibleToasts.find((t) => t.content.message === message)) {
    toastQueue.add({ status, message }, { timeout: 4000 });
  }
}

export function GlobalToastRegion() {
  return (
    <ToastRegion
      queue={toastQueue}
      className="absolute bottom-2 start-1/2 -translate-x-1/2 gap-2 flex flex-col items-center"
    >
      {({ toast }) => <Toast toast={toast} />}
    </ToastRegion>
  );
}
