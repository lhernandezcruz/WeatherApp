import { createContext } from "react";

const WeatherContext = createContext({
  locationName: "Some city",
  isLoading: false,
  current: {
    temperature: 60,
    text: "Clear",
    iconCode: 1000,
    daytime: false,
  },
  hourly: Array(24).fill({
    time: Math.round(Date.now() / 1000),
    temperature: 60,
    iconCode: 1000,
    daytime: false,
  }),
});

export default WeatherContext;
