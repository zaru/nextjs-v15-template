import type { Meta } from "@storybook/react";
import React, { useMemo, useState } from "react";
import {
  type SortDescriptor,
  TableBody,
  type TableProps,
} from "react-aria-components";
import { Cell, Column, Row, Table, TableHeader } from "./Table";

const meta: Meta<typeof Table> = {
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type FileItem = {
  id: number;
  name: string;
  date: string;
  type: string;
  [key: string]: string | number;
};

const rows: FileItem[] = [
  { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
  { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
  { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
  { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  { id: 5, name: "Proposal.ppt", date: "6/18/2022", type: "PowerPoint file" },
  { id: 6, name: "Taxes.pdf", date: "12/6/2023", type: "PDF Document" },
  { id: 7, name: "Photos", date: "8/2/2021", type: "File folder" },
  { id: 8, name: "Documents", date: "3/18/2023", type: "File folder" },
  { id: 9, name: "Budget.xls", date: "1/6/2024", type: "Excel file" },
];

export const Example = (args: TableProps) => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const items = useMemo(() => {
    const column = sortDescriptor.column?.toString() || "name";
    const items = rows.slice().sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return typeof aValue === "string" && typeof bValue === "string"
        ? aValue.localeCompare(bValue)
        : 0;
    });
    if (sortDescriptor.direction === "descending") {
      items.reverse();
    }
    return items;
  }, [sortDescriptor]);

  return (
    <Table
      aria-label="Files"
      {...args}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <Column id="name" isRowHeader allowsSorting>
          Name
        </Column>
        <Column id="type" allowsSorting>
          Type
        </Column>
        <Column id="date" allowsSorting>
          Date Modified
        </Column>
      </TableHeader>
      <TableBody items={items}>
        {(row) => (
          <Row>
            <Cell>{row.name}</Cell>
            <Cell>{row.type}</Cell>
            <Cell>{row.date}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

Example.args = {
  onRowAction: null,
  onCellAction: null,
  selectionMode: "multiple",
};
