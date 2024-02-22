import type { GroupRowDefinition } from "./GroupType";
import React, {useMemo} from "react";


interface GroupSidebarProps {
  group: GroupRowDefinition;
  grouped_sub_rows: any;
}

function GroupSidebar(props: GroupSidebarProps) {
  console.log("aaa",props.grouped_sub_rows)
  const row_height =  useMemo(
    ()=> {
      let new_row_height = 0
      for(const gr of props.group.rows) {
        new_row_height += 2
        if(props.grouped_sub_rows[gr.id]) {
          new_row_height += props.grouped_sub_rows[gr.id].length * 30;
        }else{
          new_row_height += 30;
        }
      }
      return new_row_height;
    }
    ,[props.grouped_sub_rows]
  )
  console.log(row_height)
  return (
    <div
      style={{width: 100, height: `${row_height}px`, border: "1px solid grey" }}
    >{props.group.id}
    </div>
  );
}

export default GroupSidebar;