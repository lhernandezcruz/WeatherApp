import axios from "axios";

export interface Location {
  latitude?: number,
  longitude?: number
}

export const fetchWeather =async (location: Location) => {
  const headers = location.latitude &&
    location.longitude && {
      headers: {
        Latitude: location.latitude.toString(),
        Longitude: location.longitude.toString(),
      },
    };
  const result = await axios(process.env.REACT_APP_WEATHER_ENDPOINT, headers);

  return {
    locationName: result.data.locationName,
    current: result.data.current,
    hourly: result.data.hourly,
  };
};
