"use client";
import React, {useState} from "react"
import RcGantt, { enUS , Gantt} from 'rc-gantt'

interface Data {
  name: string
  startDate: string
  endDate: string
}

export default function RcGanttTest1() {
  const data = Array.from({ length: 100 }).fill({
    name: 'Title',
  }) as Data[]

  return (
    <div className="flex h-screen flex-col m-8">
      <h1>gantt-task-react test1</h1>
      <RcGantt
        data={data}
        columns={[
          {
            name: 'name',
            label: 'name',
            width: 200,
          },
        ]}
        onUpdate={async () => {
          return true
        }}
      />
    </div>
  )
}