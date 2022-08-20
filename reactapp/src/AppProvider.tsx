import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { fetchWeather } from './api/ApiClient';

export type Location = {
  latitude?: number;
  longitude?: number;
  locationName?: string;
};

export type HourForecast = {
  temperature: number;
  time: number;
  iconCode: number;
  daytime: boolean;
};

/**
 * The current weather and hourly forecast for the location
 */
export type WeatherForecast = {
  locationName: string;
  current: {
    temperature: number;
    text: string;
    iconCode: number;
    daytime: boolean;
  };
  hourly: Array<HourForecast>;
};

export const defaultWeatherForecast: WeatherForecast = {
  locationName: 'Some city',
  current: {
    temperature: 60,
    text: 'Clear',
    iconCode: 1000,
    daytime: false,
  },
  hourly: Array(24).fill({
    time: Math.round(Date.now() / 1000),
    temperature: 60,
    iconCode: 1000,
    daytime: false,
  }),
};

export type AppData = {
  isLoading: boolean;
  weatherForecast: WeatherForecast;
  fetchData: (location: Location) => void;
};

export const defaultLocation: Location = {
  locationName: 'Some city',
};

export const defaultAppdata: AppData = {
  isLoading: false,
  weatherForecast: defaultWeatherForecast,
  fetchData: () => ({}),
};

export const AppContext = createContext<AppData>(defaultAppdata);
const AppProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const [isLoading, setLoading] = useState(true);
  const [weather, updateWeather] = useState(defaultWeatherForecast);

  const fetchData = async (locationToFetchData: Location) => {
    setLoading(true);
    const newWeather = await fetchWeather(locationToFetchData);
    updateWeather(newWeather);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(defaultLocation);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        fetchData,
        weatherForecast: weather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
