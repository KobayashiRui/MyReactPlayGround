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
const Timeline = dynamic(() => import('@/components/dnd-timeline-timeaxis2/Timeline'), { ssr: false })

const DEFAULT_TIMEFRAME: Timeframe = {
  //start: startOfDay(new Date()),
  start: new Date(0,0,0, 6, 0),
  end: endOfDay( new Date(0,0,0,0,0)),
};

const ItemOptions :any = {
  minDuation: 15,
}

type TimelineChartProps = {
  items: any[],
  setItems: any,
  row_groups_data: any[],
}


export default function TimelineChart({items, setItems, row_groups_data}:TimelineChartProps){
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);

  //const [items, setItems] = useState(items_data);
  const [row_groups, set_row_groups] = useState(row_groups_data);

  const onResizeEnd = useCallback(
    (event: ResizeEndEvent) => {
      const getRelevanceFromResizeEvent = event.active.data.current
        ?.getRelevanceFromResizeEvent as GetRelevanceFromResizeEvent;

      const updatedRelevance = getRelevanceFromResizeEvent(event);

      if (!updatedRelevance) return;

      const activeItemId = event.active.id;

      setItems((prev:any) =>
        prev.map((item:any) => {
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
      <Timeline items={items} row_groups={row_groups}/>
    </TimelineContext>
  );
}