import { Flex, Text, Link } from "@chakra-ui/react";

export default () => {
  return (
    <Flex flexDir="row" align="flex-start" position="fixed" bottom="1em" left="1em">
      <Text fontSize="2xs">
        <Link
          href="https://github.com/lhernandezcruz/WeatherApp"
          color="gray.100"
          textDecoration="underline"
          paddingRight="5px"
        >
          Source Code
        </Link>
      </Text>
      <Text fontSize="2xs" color="gray.100">
        By
        <Link
          paddingLeft="5px"
          href="https://github.com/lhernandezcruz"
          color="gray.100"
          textDecoration="underline"
        >
          lhernandezcruz
        </Link>
      </Text>
    </Flex>
  );
};
