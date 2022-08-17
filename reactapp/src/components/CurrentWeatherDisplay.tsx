import React, { useContext } from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import getWeatherIcon from "../util/IconMapping";
import { AppContext } from "../AppProvider";

const CurrentWeatherDisplay = () => {
  const { weatherForecast } = useContext(AppContext);
  const { current } = weatherForecast; 
  return (
    <Flex
      backgroundSize="contain"
      textAlign="center"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
    >
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
