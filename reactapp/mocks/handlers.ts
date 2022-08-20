import { rest } from 'msw';
import { location1WeatherMock } from './weatherResponses';

export const handlers = [
  rest.get(import.meta.env.VITE_WEATHER_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(location1WeatherMock));
  }),
];
 