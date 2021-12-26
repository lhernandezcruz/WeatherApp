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
      // TODO: hide API key
      const apiKey = "cff5475be78d7ccc46d0b2ccf804d821";
      const result = await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.latitude}&lon=${props.longitude}&appid=${apiKey}&units=imperial`
      );

      // TODO: add error state

      const newWeather = {
        cityName: result.data.name,
        temperature: parseInt(result.data.main.temp),
        condition: result.data.weather[0].main,
        iconId: result.data.weather[0].icon,
      };

      setWeather(newWeather);
      setLoading(false);
    };

    fetchData();
  }, [props.latitude, props.longitude]);

  if (isLoading) {
    return <Spinner color="white"></Spinner>;
  }

  const iconUrl = `https://openweathermap.org/img/w/${weather.iconId}.png`;
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
        <Img src={iconUrl} justifySelf="center"></Img>
        <Text fontSize="3xl">{weather.temperature} &deg;F</Text>
        <Text fontSize="3xl">{weather.condition}</Text>
      </Flex>
      <Text fontSize="2xs">
        <Link
          href="https:/github.com/lhernandezcruz/WeatherApp"
          color="teal.500"
          textDecoration="underline"
        >
          Source Code
        </Link>
      </Text>
      <Text fontSize="2xs">
        By{" "}
        <Link
          href="https:/github.com/lhernandezcruz"
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
