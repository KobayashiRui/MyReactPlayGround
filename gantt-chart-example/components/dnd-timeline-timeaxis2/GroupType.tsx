import type { ItemDefinition, RowDefinition } from "dnd-timeline";



export interface GroupRowDefinition {
  id: string;
  row_list: RowDefinition[] | GroupRowDefinition[];
}