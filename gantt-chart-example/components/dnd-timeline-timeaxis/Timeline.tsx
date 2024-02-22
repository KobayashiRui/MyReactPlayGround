import type { ItemDefinition, RowDefinition } from "dnd-timeline";
import type { GroupRowDefinition } from "./GroupType";
import { groupItemsToSubrows, useTimelineContext } from "dnd-timeline";
import React, { useMemo } from "react";
import Row from "./Row";
import Sidebar from "./Sidebar";
import GroupRow from "./GroupRow";
import GroupSidebar from "./GroupSidebar";
import Item from "./Item";
import Subrow from "./Subrow";
import TimeAxis from "./TimeAxis";
import TimeCursor from "./TimeCursor";
import TimeGrid from "./TimeGrid";
import type { MarkerDefinition } from "./TimeAxis";
import { hoursToMilliseconds, format, minutesToMilliseconds } from "date-fns";

const timeAxisMarkers: MarkerDefinition[] = [
  {
    value: minutesToMilliseconds(60),
    maxTimeframeSize: hoursToMilliseconds(24),
    getLabel: (date: Date) => format(date, "HH"),
  },
  {
    value: minutesToMilliseconds(15),
    maxTimeframeSize: hoursToMilliseconds(24),
    getLabel: (date: Date) => format(date, "m"),
  },
];

interface TimelineProps {
  //rows: RowDefinition[];
  items: ItemDefinition[];
  row_groups: GroupRowDefinition[]; 
}

function Timeline(props: TimelineProps) {
  const { setTimelineRef, style, timeframe } = useTimelineContext();

  const groupedSubrows = useMemo(
    () => groupItemsToSubrows(props.items, timeframe),
    [props.items, timeframe],
  );
  console.log(groupedSubrows)

  return (
    <div ref={setTimelineRef} style={style}>
      <TimeAxis markers={timeAxisMarkers} />
      <TimeGrid/>
      {props.row_groups.map((row_group, rgi)=> (
        <GroupRow id={row_group.id} key={rgi} group_sidebar={<GroupSidebar group={row_group} grouped_sub_rows={groupedSubrows}/>}>
        {row_group.rows.map((row) => (
          <Row id={row.id} key={row.id} sidebar={<Sidebar row={row} />}>
            {groupedSubrows[row.id]?.map((subrow, index) => (
              <Subrow key={`${row.id}-${index}`}>
                {subrow.map((item) => (
                  <Item id={item.id} key={item.id} relevance={item.relevance}>
                    {`${item.id}`}
                  </Item>
                ))}
              </Subrow>
            ))}
          </Row>
        ))}
        </GroupRow>
      ))}
    </div>
  );
}

export default Timeline;