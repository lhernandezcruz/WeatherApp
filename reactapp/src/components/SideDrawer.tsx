import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, IconButton, List, ListIcon, ListItem, useDisclosure } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BiCurrentLocation, BiMenu } from 'react-icons/bi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { AppContext } from '../AppProvider';
import { Location } from '../AppProvider';
import ls from 'localstorage-slim';

const DrawerExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchData, weatherForecast } = useContext(AppContext);
  const [savedLocations, updateSavedLocations] = useState<Array<Location>>(() => {
    const savedLocations = ls.get<string>('savedLocations', { decrypt: true });
    return JSON.parse(savedLocations || '[]');
  });
  const updateWeatherUsingBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchData({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const toggleSavedLocation = () => {
    let newSavedLocations = [];
    if (isLocationSaved) {
      newSavedLocations = savedLocations.filter((location: Location) => {
        return location.locationName !== weatherForecast.location.locationName;
      });
    } else {
      newSavedLocations = [...savedLocations, weatherForecast.location];
    }
    ls.set('savedLocations', JSON.stringify(newSavedLocations), { encrypt: true });
    updateSavedLocations(newSavedLocations);
  };

  const savedLoc = savedLocations.find(({ locationName }) => {
    return locationName === weatherForecast.location.locationName;
  });
  const isLocationSaved = savedLoc !== undefined;

  return (
    <>
      <HStack marginLeft="0">
        {savedLocations.length > 0 && <IconButton
          icon={<BiMenu />}
          variant='outline'
          aria-label={'Menu'}
          onClick={onOpen}
        />}

        <IconButton
          icon={<BiCurrentLocation />}
          variant='outline'
          aria-label="Use current location"
          onClick={updateWeatherUsingBrowserLocation}
          hidden={!('geolocation' in navigator)}
        />
        <IconButton
          icon={isLocationSaved ? <BsHeartFill /> : <BsHeart />}
          variant='outline'
          aria-label="Save location"
          onClick={toggleSavedLocation}
          hidden={!('geolocation' in navigator)}
        />
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Saved Locations</DrawerHeader>

          <List>
            {savedLocations.map((location: Location) => {
              return (
                <ListItem _hover={{ cursor: 'pointer', backgroundColor: 'gray' }} padding="1vw" key={location.locationName} onClick={() => fetchData(location)}>
                  <ListIcon as={GoLocation} color='green.500' />
                  {location.locationName}
                </ListItem>
              );
            })}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerExample;