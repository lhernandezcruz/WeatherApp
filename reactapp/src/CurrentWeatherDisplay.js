import CurrentLocation from "./CurrentLocation";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { WiThermometer } from "react-icons/wi";

const CurrentWeatherDisplay = (props) => {
  return (
    <Flex
      backgroundSize="contain"
      textAlign="center"
      color="white"
      flexDirection="column"
      justifyContent="space-between"
      height={["85vh", "85vh", "80vh", "50vh"]}
      width={["100vw", "100vw", "100vw"]}
    >
      <CurrentLocation cityName={props.cityName} />
      <Flex flexDirection="column" align="start">
        <Flex flexDirection="row" align="flex-end" justify="flex-start">
          <Icon as={WiThermometer} w={8} h={10}></Icon>
          <Text fontSize="3xl">{props.weather.text}</Text>
        </Flex>
        <Text fontSize="6xl">{props.weather.temperature}&deg;F</Text>
      </Flex>
    </Flex>
  );
};

export default CurrentWeatherDisplay;
