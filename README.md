# WeatherApp

A web app that gets the weather at your current location and displays it in a simplified manner. [Try Now](https://weather.lhernandezcruz.com).

<img src="screenshots/weatherInfo.png" height="450px">

## Usage

The initial location is retrieved using the ip address but clicking the current location icon will update the weather based on the location provided by the web browser.

## Built With
* [Geolocation Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) - Web Browser API that prompts user for location
* [ipapi](https://ipapi.co/) - Provides approximation of location given user IP address
* [Location IQ](https://locationiq.com) - Provides city given coordinates for more accurate data
* [Weather API](https://www.weatherapi.com/) - Provides weather information
* [React](https://reactjs.org/) - JS library for building web interfaces
* [Chakra UI](https://reactjs.org/) - Component library for simplified styling

## Legacy

The first iteration of the weather app was created just using html, js, and css. The site is served using github pages and used for demonstrative purposes of how one might first pick up webdev skills. [Try Now](https://lhernandezcruz.github.io/WeatherApp/).

The legacy version of the app uses [ipinfo.io](https://ipinfo.io/) to obtain city and country of the user (without prompting user).

![Screenshot](screenshots/weatherInfo-legacy.PNG)

## Authors
* Luis Hernandez Cruz - [lhernandezcruz](https://github.com/lhernandezcruz)
