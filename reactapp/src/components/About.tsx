import { Flex, Text, Link } from '@chakra-ui/react';

const About = () => {
  return (
    <Flex flexDir="row" alignSelf="flex-end">
      <Text fontSize="2xs">
        <Link
          href="https://github.com/lhernandezcruz/WeatherApp"
          color="gray.100"
          textDecoration="underline"
          paddingRight="5px"
        >
          Code
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

export default About;