"use client";

import type React from "react";
import {
  Autocomplete as AriaAutocomplete,
  type AutocompleteProps as AriaAutocompleteProps,
  Menu as AriaMenu,
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  Collection,
  Header,
  type MenuItemProps,
  useFilter,
} from "react-aria-components";
import { MenuItem } from "./Menu";
import { SearchField } from "./SearchField";

export interface AutocompleteProps<T extends object>
  extends Omit<AriaAutocompleteProps, "children"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  items?: Iterable<T>;
  label?: string;
}

export function Autocomplete<T extends object>({
  items,
  children,
  label,
  ...props
}: AutocompleteProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    <div className="p-3 border-2 border-gray-200 rounded-xl dark:border-zinc-700">
      <AriaAutocomplete filter={contains} {...props}>
        <SearchField {...(label !== undefined ? { label } : {})} />
        <AriaMenu
          {...(items !== undefined ? { items } : {})}
          className="p-1 outline-0 h-[190px] overflow-auto"
          {...props}
        >
          {children}
        </AriaMenu>
      </AriaAutocomplete>
    </div>
  );
}

export function AutocompleteItem(props: MenuItemProps) {
  return <MenuItem {...props} />;
}

export interface AutocompleteSectionProps<T> extends AriaMenuSectionProps<T> {
  title?: string;
  items?: Iterable<T>;
}

export function AutocompleteSection<T extends object>(
  props: AutocompleteSectionProps<T>,
) {
  return (
    <AriaMenuSection className="first:-mt-[5px] after:content-[''] after:block after:h-[5px]">
      <Header className="text-sm font-semibold text-gray-500 dark:text-zinc-300 px-4 py-1 truncate sticky -top-[5px] -mt-px -mx-1 z-10 bg-gray-100/60 dark:bg-zinc-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 border border-gray-200 dark:border-zinc-700 [&+*]:mt-1 rounded">
        {props.title}
      </Header>
      {/* items が undefined の場合も考慮 */}
      <Collection items={props.items as Iterable<T>}>
        {props.children}
      </Collection>
    </AriaMenuSection>
  );
}
