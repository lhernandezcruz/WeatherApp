import { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { Flex } from "@chakra-ui/react";

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

  // TODO: Add different background images
  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      bgColor="#1E90FF"
      bgPos="center"
      bgSize="cover"
    >
      <WeatherDisplay
        latitude={location.latitude}
        longitude={location.longitude}
        onGetCurrentLocation={getUserLocation}
      />
    </Flex>
  );
}

export default App;
