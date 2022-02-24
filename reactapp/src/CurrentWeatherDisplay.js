import CurrentLocation from "./CurrentLocation";
import { Flex, Text, Icon } from "@chakra-ui/react";
import getWeatherIcon from "./IconMapping";

const CurrentWeatherDisplay = (props) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      flexBasis="60%"
      width={["100vw", "100vw", "100vw"]}
    >
      <CurrentLocation cityName={props.cityName} />
      <Flex flexDirection="column" alignItems="flex-start">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={getWeatherIcon(props.weather.daytime, props.weather.iconCode)} boxSize={10}></Icon>
          <Text fontSize="2xl">{props.weather.text}</Text>
        </Flex>
        <Text fontSize={["4xl", "5xl", "6xl"]}>{props.weather.temperature}&deg;F</Text>
      </Flex>
    </Flex>
  );
};

export default CurrentWeatherDisplay;
