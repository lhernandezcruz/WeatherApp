import React, { useContext } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import getWeatherIcon from "../util/IconMapping";
import WeatherContext, { HourForecast, WeatherForecast } from "../WeatherContext";

const getForecastForNextNHours = (fullHourlyForecast : Array<HourForecast>, totalHours: number) => {
  // find index of the current time and only show next 24 hours forecast
  const currentHour = new Date(Date.now()).getHours();
  const indexOfCurrentHour = fullHourlyForecast.findIndex((hourForecast) => {
    const forecastHour = new Date(hourForecast.time * 1000).getHours();
    return currentHour === forecastHour;
  });
  return fullHourlyForecast.slice(
    indexOfCurrentHour,
    indexOfCurrentHour + totalHours
  );
}
const HourlyForecast = () => {
  const { hourly: fullHourlyForecast }: WeatherForecast = useContext(WeatherContext);
  const hourlyForecast24Hours = getForecastForNextNHours(fullHourlyForecast, 24);
  
  return (
    <Flex flexDirection="column" borderTop={"1px"} borderColor={"gray.100"}>
      <Text fontSize={"2xl"}>Forecast</Text>
      <Flex
        flexDirection="row"
        overflowX="scroll"
        maxWidth={["90vw", "95vw"]}
        paddingBottom="1rem"
        css={{ scrollbarWidth: "thin", scrollbarColor: "white transparent" }}
        justifyContent="space-between"
        gap="2rem"
      >
        {hourlyForecast24Hours.map((hourlyForecast, index) => {
          const hourTime = new Date(hourlyForecast.time * 1000);
          const options: Intl.DateTimeFormatOptions = {
            hour: "numeric",
          };
          return (
            <Flex
              flexDirection="column"
              key={hourlyForecast.time + index}
              alignItems="center"
              borderColor="gray.100"
              borderWidth="1px"
              borderRadius="4px"
              width="6rem"
              padding="1rem"
            >
              <Text fontSize="2xl" whiteSpace="nowrap">
                {Intl.DateTimeFormat(undefined, options).format(hourTime)}
              </Text>
              <Icon
                as={getWeatherIcon(
                  hourlyForecast.daytime,
                  hourlyForecast.iconCode
                )}
                boxSize={10}
              ></Icon>
              <Text fontSize="2xl">{hourlyForecast.temperature}&deg;F</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default HourlyForecast;
