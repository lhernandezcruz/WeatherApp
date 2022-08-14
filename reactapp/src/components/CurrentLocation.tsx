import React, { useContext } from "react";
import { Flex, Text } from "@chakra-ui/react";
import WeatherContext, { WeatherForecast } from "../WeatherContext";

const CurrentLocation = () => {
  const { locationName } : WeatherForecast = useContext(WeatherContext);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <Flex flexDir="column" align="flex-start">
      <Text fontSize={["4xl", "5xl"]} paddingRight="0.5em">
        {locationName}
      </Text>
      <Text fontSize={["1xl", "2xl"]}>
        {Intl.DateTimeFormat(undefined, options).format(Date.now())}
      </Text>
    </Flex>
  );
};

export default CurrentLocation;
