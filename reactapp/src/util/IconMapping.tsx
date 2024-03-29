import { DAY_CODE_TO_ICON, NIGHT_CODE_TO_ICON } from './Constants';
import { WiThermometer } from 'react-icons/wi';
import { IconType } from 'react-icons';

const getWeatherIcon = (isDay: boolean, iconCode: number) : IconType => {
  const icon = isDay ? DAY_CODE_TO_ICON[iconCode] : NIGHT_CODE_TO_ICON[iconCode];
  return icon || WiThermometer;
};

export default getWeatherIcon;