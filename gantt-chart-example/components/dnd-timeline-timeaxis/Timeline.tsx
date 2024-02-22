import type { ItemDefinition, RowDefinition } from "dnd-timeline";
import { groupItemsToSubrows, useTimelineContext } from "dnd-timeline";
import React, { useMemo } from "react";
import Row from "./Row";
import Sidebar from "./Sidebar";
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

interface RowGroupDefinition {
  id: string;
  rowIds: string[];
}

interface TimelineProps {
  rows: RowDefinition[];
  items: ItemDefinition[];
  row_groups: RowGroupDefinition[]; 
}

function Timeline(props: TimelineProps) {
  const { setTimelineRef, style, timeframe } = useTimelineContext();

  const groupedSubrows = useMemo(
    () => groupItemsToSubrows(props.items, timeframe),
    [props.items, timeframe],
  );

  return (
    <div ref={setTimelineRef} style={style}>
      <TimeAxis markers={timeAxisMarkers} />
      <TimeGrid/>
      {props.rows.map((row) => (
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
    </div>
  );
}

export default Timeline;