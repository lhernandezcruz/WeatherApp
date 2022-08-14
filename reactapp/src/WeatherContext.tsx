import { createContext } from "react";

export type HourForecast = {
  temperature: number,
  time: number,
  iconCode: number,
  daytime: boolean,
}

/**
 * The current weather and hourly forecast for the location
 */
export type WeatherForecast = {
  locationName: string,
  current: {
    temperature: number,
    text: string,
    iconCode: number,
    daytime: boolean,
  },
  hourly: Array<HourForecast>
};

export const defaultWeatherForecast: WeatherForecast = {
  locationName: "Some city",
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
}

const WeatherContext = createContext<WeatherForecast>(defaultWeatherForecast);
export default WeatherContext;
