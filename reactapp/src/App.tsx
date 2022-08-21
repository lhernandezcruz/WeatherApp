import { useContext } from 'react';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import About from './components/About';
import HourlyForecast from './components/HourlyForecast';
import {
  COLD_WEATHER_GRADIENT,
  WARM_WEATHER_MIN,
  WARM_WEATHER_GRADIENT,
  HOT_WEATHER_MIN,
  HOT_WEATHER_GRADIENT,
  SUPER_HOT_WEATHER_GRADIENT,
  SUPER_HOT_WEATHER_MIN,
} from './util/Constants';
import CurrentLocation from './components/CurrentLocation';
import { AppContext } from './AppProvider';
import SideDrawer from './components/SideDrawer';

const linearGradient = (colorValues: [string, string]) => {
  return `linear(to-b, ${colorValues[0]}, ${colorValues[1]})`;
};

const getBackgroundGradient = (temperature: number) => {
  if (temperature >= SUPER_HOT_WEATHER_MIN) {
    return linearGradient(SUPER_HOT_WEATHER_GRADIENT);
  } else if (temperature >= HOT_WEATHER_MIN) {
    return linearGradient(HOT_WEATHER_GRADIENT);
  } else if (temperature >= WARM_WEATHER_MIN) {
    return linearGradient(WARM_WEATHER_GRADIENT);
  }
  return linearGradient(COLD_WEATHER_GRADIENT);
};

function App() {
  const { isLoading, weatherForecast } = useContext(AppContext);
  return (
    <>
      {isLoading ? (
        <Flex height="100%" width="100%" z-index="1" position="absolute" alignItems="center" justifyContent="center">
          <Spinner color="white" />
        </Flex>
      ) : null}
      <Flex
        padding="1em"
        align="flex-start"
        height="100%"
        bgGradient={getBackgroundGradient(weatherForecast.current.temperature)}
        bgPos="center"
        bgSize="cover"
        color="white"
        flexDirection="column"
        maxWidth="100vw"
        overflowX="hidden"
        justifyContent="space-between"
      >
        <Box>
          <SideDrawer />
          <CurrentLocation />
        </Box>
        <Flex flexDirection="column" maxWidth="100%">
          <CurrentWeatherDisplay />
          <HourlyForecast />
          <Box alignSelf="flex-start" maxWidth="100%" marginTop="1em">
            <About />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
