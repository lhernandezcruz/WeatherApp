import { HourForecast } from '../AppProvider';

export const getForecastForNextNHours = (fullHourlyForecast: Array<HourForecast>, totalHours: number) => {
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
};
