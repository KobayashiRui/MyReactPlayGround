import type { ItemDefinition, RowDefinition } from "dnd-timeline";
import type { ExtendRowDefinition, GroupRowDefinition } from "./ExtendTypes";
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
      {props.row_groups.map((_row_group, rgi)=> {
        const row_group = _row_group as GroupRowDefinition;
        return (
          <React.Fragment key={rgi}>
            {row_group.row_list.map((_sub_group, sgi) => {
              const sub_group = _sub_group as GroupRowDefinition;
              return (
                <React.Fragment key={sgi}>
                  {
                    sub_group.row_list.map((row: ExtendRowDefinition, ri)=> {
                      let sub_group_param = {group_name: sub_group.name, top: ri==0 ? true: false, bottom: ri == (sub_group.row_list.length -1) ? true : false }
                      let top_group_param = {group_name: row_group.name, top: sgi==0 && sub_group_param.top ? true: false, bottom: sgi == (row_group.row_list.length -1) && sub_group_param.bottom  ? true : false }
                      return (
                        <Row id={row.id} key={row.id} sidebar={<Sidebar row={row} top_group={top_group_param} sub_group={sub_group_param} />}>
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
                      )
                    })
                  }
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )
      }
      )}
    </div>
  );
}

export default Timeline;