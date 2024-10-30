import { FunctionComponent, useMemo } from "react";
import { TAItem } from "./types";

type Props = {
  width: number;
  height: number;
  items: TAItem[];
};

const TimeseriesAlignmentView: FunctionComponent<Props> = ({
  width,
  height,
  items,
}) => {
  const { startTime, endTime } = useMemo(() => {
    let startTime: number | undefined = undefined;
    let endTime: number | undefined = undefined;
    for (const item of items) {
      if (startTime === undefined || item.startTime < startTime)
        startTime = item.startTime;
      if (endTime === undefined || item.endTime > endTime)
        endTime = item.endTime;
    }
    return { startTime, endTime };
  }, [items]);

  return (
    <div
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        width: width - 20,
        height: height - 20,
        overflowY: "auto",
      }}
    >
      {items.map((item) => (
        <div key={item.path} title={item.neurodataType}>
          <TAItemView
            key={item.path}
            item={item}
            startTime={startTime}
            endTime={endTime}
            width={width - 20}
          />
        </div>
      ))}
    </div>
  );
};

type TAItemViewProps = {
  item: TAItem;
  startTime?: number;
  endTime?: number;
  width: number;
};

const TAItemView: FunctionComponent<TAItemViewProps> = ({
  item,
  startTime,
  endTime,
  width,
}) => {
  const h1 = 18;
  const h2 = 7;
  const h3 = 15;
  const p1 =
    ((item.startTime - (startTime || 0)) /
      ((endTime || 1) - (startTime || 0))) *
    width;
  const p2 =
    ((item.endTime - (startTime || 0)) / ((endTime || 1) - (startTime || 0))) *
    width;
  if (item.startTime === undefined)
    return <div>item.startTime is undefined</div>;
  if (item.endTime === undefined) return <div>item.endTime is undefined</div>;
  if (typeof item.startTime !== "number")
    return <div>item.startTime is not a number</div>;
  if (typeof item.endTime !== "number")
    return <div>item.endTime is not a number</div>;
  return (
    <div style={{ position: "relative", width, height: h1 + h2 + h3 }}>
      <div
        style={{
          position: "absolute",
          width,
          height: h1,
          color: item.color,
          fontSize: 14,
        }}
      >
        {item.path} ({item.neurodataType}) [{item.startTime.toFixed(1)} -{" "}
        {item.endTime.toFixed(1)} sec]
      </div>
      <div
        style={{
          position: "absolute",
          left: p1,
          width: p2 - p1,
          height: h2,
          top: h1,
          background: item.color,
        }}
      />
    </div>
  );
};

export default TimeseriesAlignmentView;
