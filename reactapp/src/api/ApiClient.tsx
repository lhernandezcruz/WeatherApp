import axios, { AxiosRequestConfig } from 'axios';

export interface Location {
  latitude?: number,
  longitude?: number,
}

export const fetchWeather = async (location: Location) => {
  const config: AxiosRequestConfig = {
    url: import.meta.env.VITE_WEATHER_ENDPOINT
  };
  if (location.latitude && location.longitude) {
    config.headers = {
      Latitude: location?.latitude?.toString(),
      Longitude: location?.longitude?.toString(),
    };
  }

  const result = await axios(config);

  return {
    locationName: result.data.locationName,
    current: result.data.current,
    hourly: result.data.hourly,
  };
};
