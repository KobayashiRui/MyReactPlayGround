import type { RowDefinition } from "dnd-timeline";
import React from "react";

interface SidebarProps {
  row: RowDefinition;
}

function Sidebar(props: SidebarProps) {
  return (
    <div
      style={{paddingLeft:100, width: 250, border: "1px solid grey" }}
    >{`Row ${props.row.id}`}</div>
  );
}

export default Sidebar;