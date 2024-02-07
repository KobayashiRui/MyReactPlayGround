"use client";

import React, {useState} from "react"
import ListMap from "@/components/list_map"

export default function Sample1() {
  const [data, set_data] = useState<any[]>([])
  const [new_data, set_new_data] = useState<string>("")

  const handleAdd = () => {
    set_data((prev:any)=>{
      const new_prev = [...prev]
      new_prev.push(new_data)
      return new_prev
    })
  }
   
  return (
    <div className="flex h-screen flex-col m-8">
      <ListMap data={data}></ListMap>
      <label>
        Add Data:
        <input className="text-" value={new_data} onChange={(e)=>{set_new_data(e.target.value)}}></input>
      </label>
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}