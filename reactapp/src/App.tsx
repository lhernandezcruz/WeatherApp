import React, { useState, useEffect } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import { Flex, IconButton, Spinner } from "@chakra-ui/react";
import About from "./components/About";
import HourlyForecast from "./components/HourlyForecast";
import {
  COLD_WEATHER_GRADIENT,
  WARM_WEATHER_MIN,
  WARM_WEATHER_GRADIENT,
  HOT_WEATHER_MIN,
  HOT_WEATHER_GRADIENT,
  SUPER_HOT_WEATHER_GRADIENT,
  SUPER_HOT_WEATHER_MIN,
} from "./util/Constants";
import { fetchWeather, Location } from './api/ApiClient';
import WeatherContext, { defaultWeatherForecast } from "./WeatherContext";

const linearGradient = (colorValues: [string, string]) => {
  return `linear(to-b, ${colorValues[0]}, ${colorValues[1]})`;
};

const getBackgroundGradient = (temperature: number) => {
  if (temperature >= SUPER_HOT_WEATHER_MIN) {
    return linearGradient(SUPER_HOT_WEATHER_GRADIENT);
  } else if (temperature >= HOT_WEATHER_MIN) {
    return linearGradient(HOT_WEATHER_GRADIENT);
  } else if (temperature >= WARM_WEATHER_MIN) {
    return linearGradient(WARM_WEATHER_GRADIENT);
  }
  return linearGradient(COLD_WEATHER_GRADIENT);
};

function App() {
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location>({});
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  const [weather, setWeather] = useState(defaultWeatherForecast);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setWeather(await fetchWeather(location));
      setLoading(false);
    };
    fetchData();
  }, [location]);

  return (
    <WeatherContext.Provider value={weather}>
      <Flex
        padding="1em"
        align="flex-start"
        height="100vh"
        bgGradient={getBackgroundGradient(weather.current.temperature)}
        bgPos="center"
        bgSize="cover"
        color="white"
        flexDirection="column"
        maxWidth="100vw"
        overflowX="hidden"
        justifyContent="center"
      >
        <CurrentWeatherDisplay />
        <HourlyForecast />

        <IconButton
          position="fixed"
          right="1em"
          top="1em"
          w={[10, 10, 10, 100]}
          h={[10, 10, 10, 100]}
          color="white"
          variant="outline"
          aria-label="Get current location"
          icon={<BiCurrentLocation />}
          onClick={getUserLocation}
          hidden={!("geolocation" in navigator)}
        />

        <About />
        {isLoading ? (
          <Spinner color="white" alignSelf="center" position={"fixed"} />
        ) : null}
      </Flex>
    </WeatherContext.Provider>
  );
}

export default App;
