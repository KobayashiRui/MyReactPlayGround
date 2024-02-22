"use client";
import React, {useState} from "react"
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

let tasks: Task[] = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
];


export default function RcGanttTest1() {

  return (
    <div className="flex h-screen flex-col m-8">
      <h1>RC-GANTT</h1>
      <Gantt tasks={tasks} 
        viewMode={ViewMode.Hour}
      />
    </div>
  )
}