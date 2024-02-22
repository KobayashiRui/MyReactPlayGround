"use client";
import './index.css'
import React, { useCallback, useState, useEffect } from "react";
import type {
  ResizeEndEvent,
  Timeframe,
  GetRelevanceFromResizeEvent,
  GetRelevanceFromDragEvent,
} from "dnd-timeline";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis
} from '@dnd-kit/modifiers';
import { TimelineContext } from "dnd-timeline";
import { endOfDay, startOfDay, minutesToMilliseconds } from "date-fns";
import {generateRows, generateItems} from "@/utils/dnd_timeline"
import dynamic from 'next/dynamic'
const Timeline = dynamic(() => import('../../components/dnd-timeline-timeaxis/Timeline'), { ssr: false })

const DEFAULT_TIMEFRAME: Timeframe = {
  //start: startOfDay(new Date()),
  start: new Date(0,0,0, 6, 0),
  end: endOfDay( new Date(0,0,0,0,0)),
};

const ItemOptions :any = {
  minDuation: 15,
}

const def_row_data = generateRows(5)
const def_items = generateItems(10, DEFAULT_TIMEFRAME, def_row_data, ItemOptions)

const row_groups_data = [
  {id: "group-0", rowIds:["row-0", "row-1"]},
  {id: "group-1", rowIds:["row-2", "row-3"]},
  {id: "group-3", rowIds:["row-4"]},
]

const rows_data = [
  {id: "row-0", disabled: false},
  {id: "row-1", disabled: false},
  {id: "row-2", disabled: false},
  {id: "row-3", disabled: false},
  {id: "row-4", disabled: false},
]

const items_data = [
  {id: "item-0", rowId: "row-0", relevance: {start:new Date(0,0,0,7,0), end:new Date (0,0,0,8,0)}, disabled: false},
  {id: "item-1", rowId: "row-1", relevance: {start:new Date(0,0,0,9,0), end:new Date (0,0,0,11,0)}, disabled: false},
  {id: "item-2", rowId: "row-3", relevance: {start:new Date(0,0,0,10,0), end:new Date (0,0,0,12,0)}, disabled: false},
]

export default function DnDTimeline(){
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);

  const [rows, setRows] = useState(rows_data);
  const [items, setItems] = useState(items_data);
  const [row_groups, set_row_groups] = useState(row_groups_data);

  const onResizeEnd = useCallback(
    (event: ResizeEndEvent) => {
      const getRelevanceFromResizeEvent = event.active.data.current
        ?.getRelevanceFromResizeEvent as GetRelevanceFromResizeEvent;

      const updatedRelevance = getRelevanceFromResizeEvent(event);

      if (!updatedRelevance) return;

      const activeItemId = event.active.id;

      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== activeItemId) return item;

          return {
            ...item,
            relevance: updatedRelevance,
          };
        }),
      );
    },
    [setItems],
  );
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const activeRowId = event.over?.id as string;

      const getRelevanceFromDragEvent = event.active.data.current
        ?.getRelevanceFromDragEvent as GetRelevanceFromDragEvent;

      const updatedRelevance = getRelevanceFromDragEvent(event);

      if (!updatedRelevance || !activeRowId) return;

      const activeItemId = event.active.id;

      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== activeItemId) return item;

          return {
            ...item,
            rowId: activeRowId,
            relevance: updatedRelevance,
          };
        }),
      );
    },
    [setItems],
  );

  return (
    <TimelineContext
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onResizeEnd={onResizeEnd}
      onTimeframeChanged={setTimeframe}
      timeframe={timeframe}
      timeframeGridSizeDefinition={minutesToMilliseconds(15)}
    >
      <Timeline items={items} rows={rows} row_groups={row_groups}/>
    </TimelineContext>
  );
}

