import type { Meta } from "@storybook/react";
import type React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Ice cream flavor",
  },
};

export default meta;

export const Example = (args: React.ComponentProps<typeof Autocomplete>) => (
  <Autocomplete {...args}>
    <AutocompleteItem>Chocolate</AutocompleteItem>
    <AutocompleteItem id="mint">Mint</AutocompleteItem>
    <AutocompleteItem>Strawberry</AutocompleteItem>
    <AutocompleteItem>Vanilla</AutocompleteItem>
    <AutocompleteItem>Cookies and Cream</AutocompleteItem>
  </Autocomplete>
);

export const DisabledItems = (
  args: React.ComponentProps<typeof Autocomplete>,
) => <Example {...args} />;
DisabledItems.args = {
  disabledKeys: ["mint"],
};

export const Sections = (args: React.ComponentProps<typeof Autocomplete>) => (
  <Autocomplete {...args}>
    <AutocompleteSection title="Fruit">
      <AutocompleteItem id="Apple">Apple</AutocompleteItem>
      <AutocompleteItem id="Banana">Banana</AutocompleteItem>
      <AutocompleteItem id="Orange">Orange</AutocompleteItem>
      <AutocompleteItem id="Honeydew">Honeydew</AutocompleteItem>
      <AutocompleteItem id="Grapes">Grapes</AutocompleteItem>
      <AutocompleteItem id="Watermelon">Watermelon</AutocompleteItem>
      <AutocompleteItem id="Cantaloupe">Cantaloupe</AutocompleteItem>
      <AutocompleteItem id="Pear">Pear</AutocompleteItem>
    </AutocompleteSection>
    <AutocompleteSection title="Vegetable">
      <AutocompleteItem id="Cabbage">Cabbage</AutocompleteItem>
      <AutocompleteItem id="Broccoli">Broccoli</AutocompleteItem>
      <AutocompleteItem id="Carrots">Carrots</AutocompleteItem>
      <AutocompleteItem id="Lettuce">Lettuce</AutocompleteItem>
      <AutocompleteItem id="Spinach">Spinach</AutocompleteItem>
      <AutocompleteItem id="Bok Choy">Bok Choy</AutocompleteItem>
      <AutocompleteItem id="Cauliflower">Cauliflower</AutocompleteItem>
      <AutocompleteItem id="Potatoes">Potatoes</AutocompleteItem>
    </AutocompleteSection>
  </Autocomplete>
);

Sections.args = {
  label: "Preferred fruit or vegetable",
};
