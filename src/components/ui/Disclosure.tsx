"use client";

import { ChevronRight } from "lucide-react";
import type React from "react";
import { useContext } from "react";
import {
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  type DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosurePanel as AriaDisclosurePanel,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps,
  Button,
  DisclosureStateContext,
  Heading,
  composeRenderProps,
} from "react-aria-components";
import { DisclosureGroupStateContext } from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

const disclosure = tv({
  base: "group min-w-64 border border-gray-200 dark:border-zinc-600 rounded-lg text-gray-900 dark:text-zinc-200",
  variants: {
    isInGroup: {
      true: "border-0 border-b last:border-b-0 rounded-b-none last:rounded-b-lg",
    },
  },
});

const disclosureButton = tv({
  extend: focusRing,
  base: "rounded-lg flex gap-2 items-center w-full text-start p-2 cursor-default",
  variants: {
    isDisabled: {
      true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
    },
    isInGroup: {
      true: "-outline-offset-2 rounded-none group-first:rounded-t-lg group-last:rounded-b-lg",
    },
  },
});

const chevron = tv({
  base: "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ease-in-out",
  variants: {
    isExpanded: {
      true: "transform rotate-90",
    },
    isDisabled: {
      true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
    },
  },
});

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
  const isInGroup = useContext(DisclosureGroupStateContext) !== null;
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosure({ ...renderProps, isInGroup, className }),
      )}
    >
      {children}
    </AriaDisclosure>
  );
}

export interface DisclosureHeaderProps {
  children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  const context = useContext(DisclosureStateContext);
  const isInGroup = useContext(DisclosureGroupStateContext) !== null;
  if (!context) return null;
  return (
    <Heading className="text-lg font-semibold">
      <Button
        slot="trigger"
        className={(renderProps) =>
          disclosureButton({ ...renderProps, isInGroup })
        }
      >
        {({ isDisabled }) => (
          <>
            <ChevronRight
              aria-hidden
              className={chevron({
                isExpanded: context?.isExpanded,
                isDisabled,
              })}
            />
            {children}
          </>
        )}
      </Button>
    </Heading>
  );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group-data-[expanded]:px-4 group-data-[expanded]:py-2",
      )}
    >
      {children}
    </AriaDisclosurePanel>
  );
}

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children: React.ReactNode;
}

export function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
  return (
    <AriaDisclosureGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "border border-gray-200 dark:border-zinc-600 rounded-lg",
      )}
    >
      {children}
    </AriaDisclosureGroup>
  );
}
