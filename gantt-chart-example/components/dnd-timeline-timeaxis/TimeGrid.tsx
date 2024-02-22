import React, { memo, useMemo } from "react";

import { useTimelineContext } from "dnd-timeline";
import { hoursToMilliseconds, format, minutesToMilliseconds } from "date-fns";

interface TimeGridLine {
  sideDelta: number;
}

function TimeGrid() {
  const { timeframe, timelineDirection, sidebarWidth, millisecondsToPixels } =
    useTimelineContext();

  const side = timelineDirection === "rtl" ? "right" : "left";

  const lines = useMemo(()=>{

    const delta = minutesToMilliseconds(15)

    const timeframeSize = timeframe.end.getTime() - timeframe.start.getTime();

    const startTime = Math.floor(timeframe.start.getTime() / delta) * delta;

    const endTime = timeframe.end.getTime();
    const timezoneOffset = minutesToMilliseconds(
      new Date().getTimezoneOffset(),
    );

    const timeGridDeltas: TimeGridLine[] = [];

    for (let time = startTime; time <= endTime; time += delta) {
      timeGridDeltas.push({
        sideDelta: millisecondsToPixels(time - timeframe.start.getTime()),
      });
    }

    return timeGridDeltas;

  }, [timeframe, millisecondsToPixels])


  return (
    <div
      style={{
        //zIndex: 0,
        width: "100%",
        marginTop: "40px",
        height: "100%",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        [side === "right" ? "marginRight" : "marginLeft"]: `${sidebarWidth}px`,
      }}
    >
      {
        lines.map( (line, index)=> {
          return (
            <div
              key={index}
              style={
                {
                  height: "100%",
                  width: "2px",
                  backgroundColor: "gray",
                  position: "absolute",
                  [side]: `${line.sideDelta-1}px`,
                }
              }
            />
          )

        })
      }

    </div>

  )


}

export default TimeGrid