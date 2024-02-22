import React, { useMemo, memo } from "react";

import { useTimelineContext } from "dnd-timeline";
import { minutesToMilliseconds } from "date-fns";

interface Marker {
  label?: string;
  sideDelta: number;
  heightMultiplier: number;
  widthDelta?: number;
}

export interface MarkerDefinition {
  value: number;
  maxTimeframeSize?: number;
  minTimeframeSize?: number;
  getLabel?: (time: Date) => string;
}

interface TimeAxisProps {
  markers: MarkerDefinition[];
}

function TimeAxis(props: TimeAxisProps) {
  const { timeframe, timelineDirection, sidebarWidth, millisecondsToPixels } =
    useTimelineContext();

  const side = timelineDirection === "rtl" ? "right" : "left";

  const marker_list = useMemo(() => {
    const markerList: Marker[][] = [];
    for( let marker of props.markers) {
      const delta = marker.value;

      const timeframeSize = timeframe.end.getTime() - timeframe.start.getTime();

      const startTime = Math.floor(timeframe.start.getTime() / delta) * delta;

      const endTime = timeframe.end.getTime();
      const timezoneOffset = minutesToMilliseconds(
        new Date().getTimezoneOffset(),
      );

      const markerSideDeltas: Marker[] = [];

      for (let time = startTime; time <= endTime; time += delta) {

        const label = marker.getLabel?.(new Date(time));

        markerSideDeltas.push({
          label,
          heightMultiplier: 1 ,
          sideDelta: millisecondsToPixels(time - timeframe.start.getTime()),
          widthDelta: millisecondsToPixels(delta)
        });
      }
      markerList.push(markerSideDeltas);
    }

    return markerList;
  }, [timeframe, millisecondsToPixels, props.markers]);

  return (
    <div>
      {
        marker_list.map( (markers, list_index) => (
        <div
          key={list_index}
          style={{
            height: "20px",
            position: "relative",
            overflow: "hidden",
            [side === "right" ? "marginRight" : "marginLeft"]: `${sidebarWidth}px`,
          }}
        >
          {markers.map((marker, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                bottom: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
                border: "1px solid gray",
                borderCollapse: "collapse",
                width: `${marker.widthDelta}px`,
                [side]: `${marker.sideDelta}px`,
              }}
            >
              {
                marker.label ? (
                <div
                  style={{
                    fontSize: "0.5rem",
                    alignSelf: "center",
                    justifyContent: "center",
                    //fontWeight: marker.heightMultiplier * 1000,
                  }}
                >
                  {marker.label}
                </div>
              ) : null}
            </div>
          ))}
          </div>
        ))

      }

    </div>
  );
}

export default memo(TimeAxis);