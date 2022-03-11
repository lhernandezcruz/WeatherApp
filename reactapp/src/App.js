import { useState, useEffect } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import axios from "axios";
import { Flex, IconButton, Spinner } from "@chakra-ui/react";
import About from "./About";
import HourlyForecast from "./HourlyForecast";
import { COLD_WEATHER_GRADIENT, WARM_WEATHER_MIN, WARM_WEATHER_GRADIENT, HOT_WEATHER_MIN, HOT_WEATHER_GRADIENT, SUPER_HOT_WEATHER_GRADIENT, SUPER_HOT_WEATHER_MIN } from './Constants';

const linearGradient = (colorValues) => {
  return `linear(to-b, ${colorValues[0]}, ${colorValues[1]})`;
}

const getBackgroundGradient = (temperature) => {
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
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null,
  });
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
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
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const headers = location.latitude &&
        location.longitude && {
          headers: {
            Latitude: 47.4456025,
            Longitude: -122.3005672,
          },
        };
      const result = await axios(
        process.env.REACT_APP_WEATHER_ENDPOINT,
        headers
      );

      // TODO: add error state
      const newWeather = {
        locationName: result.data.locationName,
        current: result.data.current,
        hourly: result.data.hourly,
      };

      setWeather(newWeather);
      setLoading(false);
    };

    fetchData();
  }, [location]);

  return (
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
      <CurrentWeatherDisplay
        locationName={weather.locationName}
        weather={weather.current}
        onGetCurrentLocation={getUserLocation}
      />

      <HourlyForecast hourlyForecast={weather.hourly} />

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
        visibility={"geolocation" in navigator ? null : "hidden"}
      />

      <About />
      {isLoading ? (
        <Spinner
          color="white"
          alignSelf="center"
          position={"fixed"}
        />
      ) : null}
    </Flex>
  );
}

export default App;
