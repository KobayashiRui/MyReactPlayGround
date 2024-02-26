import type { RowDefinition } from "dnd-timeline";

export interface ExtendRowDefinition extends RowDefinition {
  name: string;
}

export interface GroupRowDefinition {
  id: string;
  name: string;
  row_list: (ExtendRowDefinition| GroupRowDefinition)[];
}