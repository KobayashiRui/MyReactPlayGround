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
import { TimelineContext } from "dnd-timeline";
import { endOfDay, startOfDay, minutesToMilliseconds } from "date-fns";
import {generateRows, generateItems} from "@/utils/dnd_timeline"
import dynamic from 'next/dynamic'
const Timeline = dynamic(() => import('../../components/dnd-timeline-timeaxis/Timeline'), { ssr: false })

const DEFAULT_TIMEFRAME: Timeframe = {
  start: startOfDay(new Date()),
  end: endOfDay(new Date()),
};

const ItemOptions :any = {
  minDuation: 15,
}

const def_row_data = generateRows(5)
const def_items = generateItems(10, DEFAULT_TIMEFRAME, def_row_data, ItemOptions)


export default function DnDTimeline(){
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME);

  const [rows, setRows] = useState(def_row_data);
  const [items, setItems] = useState(def_items);


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
      onDragEnd={onDragEnd}
      onResizeEnd={onResizeEnd}
      onTimeframeChanged={setTimeframe}
      timeframe={timeframe}
      timeframeGridSizeDefinition={minutesToMilliseconds(15)}
    >
      <Timeline items={items} rows={rows} />
    </TimelineContext>
  );
}

