import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiCurrentLocation } from "react-icons/bi";
import { Flex, Text, IconButton, Spinner, Link, Img } from "@chakra-ui/react";

const WeatherDisplay = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
    cityName: null,
    temperature: null,
    condition: null,
    iconId: null,
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const headers = props.latitude && props.longitude && { headers : { Latitude: props.latitude, Longitude: props.longitude }};
      const result = await axios(process.env.REACT_APP_WEATHER_ENDPOINT, headers);

      // TODO: add error state
      const newWeather = {
        cityName: result.data.cityName,
        temperature: result.data.current.temperature,
        condition: result.data.current.description,
        icon: result.data.current.icon,
      };

      setWeather(newWeather);
      setLoading(false);
    };

    fetchData();
  }, [props.latitude, props.longitude]);

  if (isLoading) {
    return <Spinner color="white"></Spinner>;
  }

  return (
    <Flex
      backgroundSize="contain"
      textAlign="center"
      color="gray.900"
      bgColor="white"
      padding="15px"
      flexDirection="column"
      boxShadow="2px 2px 1px 0px"
      minH={["50vh", "65vh"]}
      minW={["60vw", "20vw"]}
    >
      <IconButton
        background="whiteAlpha.200"
        color="gray.500"
        variant="outline"
        alignSelf="flex-end"
        aria-label="Get current location"
        icon={<BiCurrentLocation />}
        onClick={props.onGetCurrentLocation}
        visibility={"geolocation" in navigator ? null : "hidden"}
      />
      <Flex flexGrow="2" flexDirection="column" alignItems="center">
        <Text fontSize="3xl">{weather.cityName}</Text>
        <Img src={weather.icon} justifySelf="center" w="50px" h="50px"></Img>
        <Text fontSize="3xl">{weather.temperature} &deg;F</Text>
        <Text fontSize="3xl">{weather.condition}</Text>
      </Flex>
      <Text fontSize="2xs">
        <Link
          href="https://github.com/lhernandezcruz/WeatherApp"
          color="teal.500"
          textDecoration="underline"
        >
          Source Code
        </Link>
      </Text>
      <Text fontSize="2xs">
        By{" "}
        <Link
          href="https://github.com/lhernandezcruz"
          color="teal.500"
          textDecoration="underline"
        >
          lhernandezcruz
        </Link>
      </Text>
    </Flex>
  );
};

export default WeatherDisplay;
