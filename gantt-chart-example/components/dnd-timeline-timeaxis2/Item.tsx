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
            height: "30px",
            backgroundColor: "green",
            border: "1px solid green",
            //borderTop: "1px solid white",
            //borderBottom: "1px solid white",
            borderRadius: "10px",
            padding:"3px",
            width: "100%",
            overflow: "hidden",
            borderCollapse: "separate",
          }}
        >
          <div style={{
            height: "100%",
            borderLeft: "4px solid rgba(211, 220, 50, .6)",
            borderRight: "4px solid rgba(211, 220, 50, .6)",
            borderRadius: "4px",
          }}>
            <div style={{margin:"0px 4px"}}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;