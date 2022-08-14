import { Box } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { getForecastForNextNHours } from "../util/WeatherUtils";
// import VictoryBar from
import WeatherContext from "../WeatherContext";
import { Area, AreaChart, Bar, Label, LabelList, Rectangle, Text, Tooltip, XAxis, YAxis } from "recharts";

// @ts-ignore
const renderCustomizedLabel = (props) => {
  const { x, y, index, value } = props;
  const radius = 15;
  if (index % 2 !== 0) {
    return <g></g>;
  }
  return (
    <g>
      <circle cx={x} cy={y} r={radius} fill="white" fillOpacity="0.1" />
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

const HourlyForecastV2 = () => {
  // VictoryBar
  const { hourly } = useContext(WeatherContext);
  const hourlyForecast24Hours = getForecastForNextNHours(hourly, 24);
  const data = hourlyForecast24Hours.map((hourForecast) => {
    const hourTime = new Date(hourForecast.time * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
    };
    return {
      hour: Intl.DateTimeFormat(undefined, options).format(hourTime),
      temperature: hourForecast.temperature
    }
  });

  return <Box overflowX="scroll" height="100%" maxWidth={["90vw", "95vw"]} css={{scrollbarWidth: "thin", scrollbarColor: "white transparent"}}>
    <AreaChart style={{overflow: "visible"}} width={1000} height={125} data={data} margin={{ top: 15, right: 0, left: 20, bottom: 0 }}>
      <XAxis interval={1} dataKey="hour" fill="white" />
      <Area isAnimationActive={false} type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity="0.1">
        <LabelList dataKey="temperature" position={"top"} content={renderCustomizedLabel} />
      </Area>
    </AreaChart>
  </Box>;
};

export default HourlyForecastV2; 