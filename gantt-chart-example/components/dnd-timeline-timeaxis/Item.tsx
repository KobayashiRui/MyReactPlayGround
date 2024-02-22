import React from "react";
import { useItem } from "dnd-timeline";
import type { Relevance } from "dnd-timeline";

interface ItemProps {
  id: string;
  relevance: Relevance;
  children: React.ReactNode;
}

function Item(props: ItemProps) {
  const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
    useItem({
      id: props.id,
      relevance: props.relevance,
    });

  return (
    <div ref={setNodeRef} style={itemStyle} {...listeners} {...attributes}>
      <div style={itemContentStyle}>
        <div
          style={{
            border: "1px solid white",
            width: "100%",
            overflow: "hidden",
            zIndex: 4,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Item;