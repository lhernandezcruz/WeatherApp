import axios from "axios";

export const fetchWeather =async (location) => {
  const headers = location.latitude &&
    location.longitude && {
      headers: {
        Latitude: location.latitude,
        Longitude: location.longitude,
      },
    };
  const result = await axios(process.env.REACT_APP_WEATHER_ENDPOINT, headers);

  return {
    locationName: result.data.locationName,
    current: result.data.current,
    hourly: result.data.hourly,
  };
};
