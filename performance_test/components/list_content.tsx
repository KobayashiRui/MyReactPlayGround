import React, {useEffect} from 'react'

export default function ListContent({data}:any) {
  useEffect(()=>{
    console.log("load: ", data)
  },[])
  return (
    <div>Data:{data}</div>
  )
}