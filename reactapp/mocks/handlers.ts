import { rest } from 'msw';
import { baseWeatherMock } from './weatherResponses';

export const handlers = [
  rest.get(import.meta.env.VITE_WEATHER_ENDPOINT, (req, res, ctx) => {
    const weather = { ...baseWeatherMock };
    if (req.headers.has('latitude')) {
      weather.location.locationName = 'New York';
      weather.location.latitude = 40.730610;
      weather.location.longitude = -75.000000;
    }
    return res(ctx.status(200), ctx.json(weather));
  }),
];
