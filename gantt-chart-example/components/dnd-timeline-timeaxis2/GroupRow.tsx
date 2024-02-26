import React from "react";
import type { CSSProperties } from "react";
import type { RowDefinition } from "dnd-timeline";

interface RowProps extends RowDefinition {
  group_sidebar: React.ReactNode;
  children: React.ReactNode;
}

const rowWrapperStyle: CSSProperties = {
  display: "inline-flex",
};

const rowStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  position: "relative",
  alignItems: "stretch",
  flexDirection: "column",
};

const rowSidebarStyle: CSSProperties = {
  left: 0,
  zIndex: 4,
  display: "flex",
  backgroundColor: "rgba(10, 100, 100)",
  position: "absolute",
  width: "auto",
  height: "auto",
};


function GroupRow(props: RowProps) {
  return (
    <div style={{display: "inline-flex",}}>
      <div style={rowSidebarStyle}>
        {props.group_sidebar}
      </div>
      <div style={rowStyle}>
        {props.children}
      </div>
    </div>

  )
}

export default GroupRow