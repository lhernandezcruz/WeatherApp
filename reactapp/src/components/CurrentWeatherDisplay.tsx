import React, { useContext } from "react";
import CurrentLocation from "./CurrentLocation";
import { Flex, Text, Icon } from "@chakra-ui/react";
import getWeatherIcon from "../util/IconMapping";
import WeatherContext, { WeatherForecast } from "../WeatherContext";

const CurrentWeatherDisplay = () => {
  const { current } : WeatherForecast = useContext(WeatherContext);
  return (
    <Flex
      backgroundSize="contain"
      textAlign="center"
      flexDirection="column"
      justifyContent="space-between"
      height={["85vh", "85vh", "80vh", "50vh"]}
      width={["100vw", "100vw", "100vw"]}
    >
      <CurrentLocation />
      <Flex flexDirection="column" alignItems="flex-start">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={getWeatherIcon(current.daytime, current.iconCode)} boxSize={10}></Icon>
          <Text fontSize="2xl">{current.text}</Text>
        </Flex>
        <Text fontSize={["5xl", "5xl", "6xl"]}>{current.temperature}&deg;F</Text>
      </Flex>
    </Flex>
  );
};

export default CurrentWeatherDisplay;
