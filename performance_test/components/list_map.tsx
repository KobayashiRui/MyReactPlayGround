import ListContent from "./list_content"

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
            <ListContent
              key={d}
              data={d}
            ></ListContent>
          )
        })
      }
    </div>
  )
}