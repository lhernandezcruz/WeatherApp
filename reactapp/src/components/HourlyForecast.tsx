import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import HourlyForecastChart from "./HourlyForecastChart";

const HourlyForecast = () => {  
  return (
    <Flex flexDirection="column" borderTop={"1px"} borderColor={"gray.100"}>
      <Text fontSize={"2xl"}>Forecast</Text>
      <Box maxWidth={["90vw", "95vw"]} >
        <HourlyForecastChart />
      </Box>
    </Flex>
  );
};

export default HourlyForecast;
