import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { AppContext } from '../AppProvider';

const CurrentLocation = () => {
  const { weatherForecast } = useContext(AppContext);
  const { locationName } = weatherForecast;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <Flex flexDir="column" align="flex-start">
      <Text fontSize={['4xl', '5xl']} paddingRight="0.5em">
        {locationName}
      </Text>
      <Text fontSize={['1xl', '2xl']}>
        {Intl.DateTimeFormat(undefined, options).format(Date.now())}
      </Text>
    </Flex>
  );
};

export default CurrentLocation;
