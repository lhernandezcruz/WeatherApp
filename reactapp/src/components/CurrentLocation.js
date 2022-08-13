import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import WeatherContext from "../WeatherContext";

const CurrentLocation = () => {
  const { locationName } = useContext(WeatherContext);
  const currentDate = new Date(Date.now());
  const options = {
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
        {currentDate.toLocaleDateString(undefined, options)}
      </Text>
    </Flex>
  );
};

export default CurrentLocation;
