import {
  getFigureData,
  startListeningToParent,
} from "@fi-sci/figurl-interface";
import { useEffect, useState } from "react";
import TimeseriesAlignmentView from "./TimeseriesAlignmentView";
import { isData } from "./types";
import useWindowDimensions from "@shared/hooks/useWindowDimensions";

function App() {
  const { data, errorMessage } = useFigureData();

  const { width, height } = useWindowDimensions();

  if (errorMessage) {
    return (
      <>
        <div>Error: {errorMessage}</div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <div>Loading data...</div>
      </>
    );
  }

  if (!isData(data)) {
    console.warn(data);
    return (
      <>
        <div>Error: Invalid data</div>
        <div>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
      </>
    );
  }

  return (
    <TimeseriesAlignmentView width={width} height={height} items={data.items} />
  );
}

const useFigureData = () => {
  const [data, setData] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    getFigureData()
      .then((data: any) => {
        if (!data) {
          setErrorMessage("No data in return from getFigureData()");
          return;
        }
        setData(data);
      })
      .catch((err: any) => {
        setErrorMessage(`Error getting figure data`);
        console.error(`Error getting figure data`, err);
      });
  }, []);
  return { data, errorMessage };
};

startListeningToParent();

export default App;
