type ListMapProps = {
  data: any[];
}

export default function ListMap({data}: ListMapProps) {
  console.log("rendering")
  return (
    <div className="flex flex-col">
      {
        data.map((d) => {
          return(
            <span>{d}</span>
          )
        })
      }
    </div>
  )
}