"use client";
import React, { useCallback, useState, useEffect } from "react";
import { format } from "date-fns";
import dynamic from 'next/dynamic'
const TimelineChart = dynamic(() => import('@/components/timeline_chart/timeline'), { ssr: false })

const row_groups_data = [
  {id: "group-0", 
  rows:[
    {id: "row-0", disabled: false},
    {id: "row-1", disabled: false},
  ]},
  {id: "group-1", rows:[
    {id: "row-2", disabled: false},
    {id: "row-3", disabled: false},
  ]},
  {id: "group-3", rows:[
    {id: "row-4", disabled: false},
  ]},
]

const items_data = [
  {id: "item-0", rowId: "row-0", relevance: {start:new Date(0,0,0,7,0), end:new Date (0,0,0,8,0)}, disabled: false},
  {id: "item-1", rowId: "row-0", relevance: {start:new Date(0,0,0,8,0), end:new Date (0,0,0,9,0)}, disabled: false},
  {id: "item-2", rowId: "row-1", relevance: {start:new Date(0,0,0,9,0), end:new Date (0,0,0,11,0)}, disabled: false},
  {id: "item-3", rowId: "row-3", relevance: {start:new Date(0,0,0,10,0), end:new Date (0,0,0,12,0)}, disabled: false},
]

export default function DnDTimeline(){

  const [items, setItems] = useState(items_data);
  const [row_groups, set_row_groups] = useState(row_groups_data);

  return (
    <div >
      <h1>Timeline</h1>
      <div className="grid grid-cols-5">
        <div className="m-4">
          <h2>Items</h2>
          <div className="flex flex-col border-2 p-4">
            {
              items.map((item) =>(
                <div>{item.id}: {format(item.relevance.start, "HH:mm")} ~ {format(item.relevance.end, "HH:mm")}</div>
              ))
            }

          </div>
        </div>
      <div className="col-span-4">
        <TimelineChart row_groups_data={row_groups} items={items} setItems={setItems}></TimelineChart>
      </div>
      </div>
    </div>
  );
}

