import { useState, useEffect } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import axios from "axios";
import { Flex, IconButton, Spinner } from "@chakra-ui/react";
import About from "./About";
import HourlyForecast from "./HourlyForecast";

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
    cityName: null,
    current: null,
    hourly: null,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const headers = location.latitude &&
        location.longitude && {
          headers: {
            Latitude: location.latitude,
            Longitude: location.longitude,
          },
        };
      const result = await axios(
        process.env.REACT_APP_WEATHER_ENDPOINT,
        headers
      );

      // TODO: add error state
      const newWeather = {
        cityName: result.data.cityName,
        current: result.data.current,
        hourly: result.data.hourly
      };

      setWeather(newWeather);
      setLoading(false);
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    return (
      <Flex
        height="100vh"
        bgGradient="linear(to-b, #0066ff, #d42bbd)"
        justify="center"
        align="center"
      >
        <Spinner color="white"></Spinner>
      </Flex>
    );
  }

  // TODO: Add different background images
  return (
    <Flex
      padding="1em"
      align="flex-start"
      height="100vh"
      bgGradient="linear(to-b, #0066ff, #d42bbd)"
      bgPos="center"
      bgSize="cover"
      color="white"
      flexDirection="column"
      maxWidth="100vw"
      overflow="hidden"
    >
      <CurrentWeatherDisplay
        cityName={weather.cityName}
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
    </Flex>
  );
}

export default App;
