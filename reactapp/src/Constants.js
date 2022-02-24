import { WiCloudy, WiDayCloudy, WiDaySunnyOvercast, WiDaySunny, WiFog, WiDaySprinkle, WiSnow, WiSleet, WiDaySnow, WiDaySleet, WiDayHaze, WiDayFog, WiDaySnowThunderstorm, WiDayThunderstorm, WiDayRain, WiDayShowers, WiRain, WiDaySnowWind, WiNightClear, WiNightCloudy, WiNightFog, WiNightSnowThunderstorm, WiNightThunderstorm, WiNightSnow, WiNightSleet, WiNightRain, WiNightSprinkle, WiNightSnowWind } from "react-icons/wi";

export const DAY_CODE_TO_ICON = {
  1000:  WiDaySunny, //Sunny
  1003:  WiDayCloudy, //Partly cloudy
  1006:  WiCloudy, //Cloudy
  1009:  WiDaySunnyOvercast, //Overcast
  1030:  WiDayHaze, //Mist
  1063:  WiDaySprinkle, //Patchy rain possible
  1066:  WiDaySnow, //Patchy snow possible
  1069:  WiDaySleet, //Patchy sleet possible
  1072:  WiDayRain, //Patchy freezing drizzle possible
  1087:  WiDayThunderstorm, //Thundery outbreaks possible
  1114:  WiDaySnowWind, //Blowing snow
  1117:  WiSnow, //Blizzard
  1135:  WiDayFog, //Fog
  1147:  WiFog, //Freezing fog
  1150:  WiDayRain, //Patchy light drizzle
  1153:  WiDayRain, //Light drizzle
  1168:  WiDayRain, //Freezing drizzle
  1171:  WiDayRain, //Heavy freezing drizzle
  1180:  WiDayRain, //Patchy light rain
  1183:  WiDayRain, //Light rain
  1186:  WiDayRain, //Moderate rain at times
  1189:  WiDayRain, //Moderate rain
  1192:  WiDayRain, //Heavy rain at times
  1195:  WiRain, //Heavy rain
  1198:  WiDayRain, //Light freezing rain
  1201:  WiDayRain, //Moderate or heavy freezing rain
  1204:  WiDaySleet, //Light sleet
  1207:  WiSleet, //Moderate or heavy sleet
  1210:  WiDaySnow, //Patchy light snow
  1213:  WiDaySnow, //Light snow
  1216:  WiDaySnow, //Patchy moderate snow
  1219:  WiDaySnow, //Moderate snow
  1222:  WiDaySnow, //Patchy heavy snow
  1225:  WiSnow, //Heavy snow
  1237:  WiDaySnow, //Ice pellets
  1240:  WiDayShowers, //Light rain shower
  1243:  WiDayShowers, //Moderate or heavy rain shower
  1246:  WiRain, //Torrential rain shower
  1249:  WiDaySnow, //Light sleet showers
  1252:  WiSleet, //Moderate or heavy sleet showers
  1255:  WiDaySnow, //Light snow showers
  1258:  WiDaySnow, //Moderate or heavy snow showers
  1261:  WiDaySnow, //Light showers of ice pellets
  1264:  WiDaySnow, //Moderate or heavy showers of ice pellets
  1273:  WiDayThunderstorm, //Patchy light rain with thunder
  1276:  WiDayThunderstorm, //Moderate or heavy rain with thunder
  1279:  WiDaySnowThunderstorm, //Patchy light snow with thunder
  1282:  WiDaySnowThunderstorm, //Moderate or heavy snow with thunder
};

export const NIGHT_CODE_TO_ICON = {
  1000:  WiNightClear, //Clear
  1003:  WiNightCloudy, //Partly cloudy
  1006:  WiCloudy, //Cloudy
  1009:  WiNightCloudy, //Overcast
  1030:  WiNightFog, //Mist
  1063:  WiNightSprinkle, //Patchy rain possible
  1066:  WiNightSnow, //Patchy snow possible
  1069:  WiNightSleet, //Patchy sleet possible
  1072:  WiNightRain, //Patchy freezing drizzle possible
  1087:  WiNightThunderstorm, //Thundery outbreaks possible
  1114:  WiNightSnowWind, //Blowing snow
  1117:  WiSnow, //Blizzard
  1135:  WiNightFog, //Fog
  1147:  WiNightFog, //Freezing fog
  1150:  WiNightRain, //Patchy light drizzle
  1153:  WiNightRain, //Light drizzle
  1168:  WiNightRain, //Freezing drizzle
  1171:  WiNightRain, //Heavy freezing drizzle
  1180:  WiNightRain, //Patchy light rain
  1183:  WiNightRain, //Light rain
  1186:  WiNightRain, //Moderate rain at times
  1189:  WiNightRain, //Moderate rain
  1192:  WiNightRain, //Heavy rain at times
  1195:  WiRain, //Heavy rain
  1198:  WiNightRain, //Light freezing rain
  1201:  WiNightRain, //Moderate or heavy freezing rain
  1204:  WiNightSleet, //Light sleet
  1207:  WiSleet, //Moderate or heavy sleet
  1210:  WiNightSnow, //Patchy light snow
  1213:  WiNightSnow, //Light snow
  1216:  WiNightSnow, //Patchy moderate snow
  1219:  WiNightSnow, //Moderate snow
  1222:  WiNightSnow, //Patchy heavy snow
  1225:  WiSnow, //Heavy snow
  1237:  WiNightSnow, //Ice pellets
  1240:  WiNightRain, //Light rain shower
  1243:  WiRain, //Moderate or heavy rain shower
  1246:  WiRain, //Torrential rain shower
  1249:  WiNightSleet, //Light sleet showers
  1252:  WiSleet, //Moderate or heavy sleet showers
  1255:  WiNightSnow, //Light snow showers
  1258:  WiNightSnow, //Moderate or heavy snow showers
  1261:  WiNightSnow, //Light showers of ice pellets
  1264:  WiNightSnow, //Moderate or heavy showers of ice pellets
  1273:  WiNightThunderstorm, //Patchy light rain with thunder
  1276:  WiNightThunderstorm, //Moderate or heavy rain with thunder
  1279:  WiNightSnowThunderstorm, //Patchy light snow with thunder
  1282:  WiNightSnowThunderstorm, //Moderate or heavy snow with thunder
}
