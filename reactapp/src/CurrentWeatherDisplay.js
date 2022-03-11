import CurrentLocation from "./CurrentLocation";
import { Flex, Text, Icon } from "@chakra-ui/react";
import getWeatherIcon from "./IconMapping";

const CurrentWeatherDisplay = (props) => {
  return (
    <Flex
      backgroundSize="contain"
      textAlign="center"
      flexDirection="column"
      justifyContent="space-between"
      height={["85vh", "85vh", "80vh", "50vh"]}
      width={["100vw", "100vw", "100vw"]}
    >
      <CurrentLocation locationName={props.locationName} />
      <Flex flexDirection="column" alignItems="flex-start">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={getWeatherIcon(props.weather.daytime, props.weather.iconCode)} boxSize={10}></Icon>
          <Text fontSize="2xl">{props.weather.text}</Text>
        </Flex>
        <Text fontSize={["5xl", "5xl", "6xl"]}>{props.weather.temperature}&deg;F</Text>
      </Flex>
    </Flex>
  );
};

export default CurrentWeatherDisplay;
