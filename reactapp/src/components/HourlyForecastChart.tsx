import { Box } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { getForecastForNextNHours } from "../util/WeatherUtils";
import { Area, AreaChart, LabelList, XAxis } from "recharts";
import { ContentType } from "recharts/types/component/Label";
import { AppContext } from "../AppProvider";

const renderCustomizedLabel: ContentType = (props) => {
  // @ts-ignore
  const { x, y, index, value } = props;
  const radius = 15;
  if (index % 2 !== 0) {
    return <g></g>;
  }
  return (
    <g>
      <circle cx={x} cy={y} r={radius} fill="currentColor" fillOpacity="0.2" />
      <text
        x={x}
        y={y}
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

const HourlyForecastV2 = () => {
  const { weatherForecast } = useContext(AppContext);
  const { hourly } = weatherForecast; 
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

  return <Box overflowX="scroll"
    height="100%" maxWidth="100%"
    css={{
      scrollbarWidth: "thin",
      scrollbarColor: "currentColor transparent",
      '::-webkit-scrollbar': {
        height: '1.5vh',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: 'none',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'currentColor',
      },
    }}>
    <AreaChart style={{ overflow: "visible" }} width={1000} height={125} data={data} margin={{ top: 15, right: 0, left: 20, bottom: 0 }}>
      <XAxis interval={1} dataKey="hour" tick={{ fill: 'currentColor' }} />
      <Area isAnimationActive={false} type="monotone" dataKey="temperature" stroke="currentColor" strokeOpacity="0.3" fillOpacity="0.1">
        <LabelList dataKey="temperature" position={"top"} content={renderCustomizedLabel} />
      </Area>
    </AreaChart>
  </Box>;
};

export default HourlyForecastV2; 