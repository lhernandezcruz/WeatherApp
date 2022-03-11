import { Flex, Text } from "@chakra-ui/react";

export default (props) => {
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
        {props.locationName}
      </Text>
      <Text fontSize={["1xl", "2xl"]}>
        {currentDate.toLocaleDateString(undefined, options)}
      </Text>
    </Flex>
  );
};
