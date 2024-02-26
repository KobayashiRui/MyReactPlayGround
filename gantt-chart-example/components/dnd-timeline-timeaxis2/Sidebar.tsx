import type { ExtendRowDefinition } from "./ExtendTypes";
import React from "react";


interface GroupFlag {
  group_name: string;
  top: boolean;
  bottom: boolean;
}

interface SidebarProps {
  row: ExtendRowDefinition;
  top_group: GroupFlag
  sub_group: GroupFlag
}

function Sidebar(props: SidebarProps) {
  return (
    <div
      style={{display: "flex", width: 400}}
    >
      {
        props.top_group.top ? 
          <div
            style={{
              width: 100, 
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey", 
              borderTop: props.top_group.top ? "1px solid grey": "", 
              borderBottom: props.top_group.bottom ? "1px solid grey": "", 
            }}
          >{`${props.top_group.group_name}`}</div>
          :<div
            style={{
              width: 100,
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey", 
              borderTop: props.top_group.top ? "1px solid grey": "", 
              borderBottom: props.top_group.bottom ? "1px solid grey": "", 
            }}
          ></div>
      }
      {
        props.sub_group.top ? 
          <div
            style={{
              width: 100, 
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey", 
              borderTop: props.sub_group.top ? "1px solid grey": "", 
              borderBottom: props.sub_group.bottom ? "1px solid grey": "", 
            }}
          >{`${props.sub_group.group_name}`}</div>
          :<div
            style={{
              width: 100, 
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey", 
              borderTop: props.sub_group.top ? "1px solid grey": "", 
              borderBottom: props.sub_group.bottom ? "1px solid grey": "", 
            }}
          ></div>
      }
      <div
        style={{width: 200, border: "1px solid grey" }}
      >{`${props.row.name}`}</div>
    </div>

  );
}

export default Sidebar;