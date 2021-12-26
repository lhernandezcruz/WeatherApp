const API_KEY = 'cff5475be78d7ccc46d0b2ccf804d821';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL = 'https://openweathermap.org/img/w/';
const ICON_EXT = '.png';
const UNITS = 'imperial';

window.addEventListener('load', event => {

    // get city and country code from ipinfo
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            updateLocation(city);

            // params for openweather call
            const params = {
                'q': city + ',' + data.country,
                'units': UNITS,
                'appid': API_KEY
            };
            
            return params;
        })
        .then(accessOpenWeather)
        .then(contents => {
            updateIcon(contents["icon"]);
            updateTemp(contents["tempValue"], contents["tempDesc"]);
        })
        .catch(error => {
            console.log('Error:', error);
            updateLocation("Error getting data.");
        });

    /**
     * Acceses OpenWeatherAPi and returns iconid, temperature value, and
     *          temperature description
     * 
     * @param {Object} params - The parameters for openweather API call
     */
    function accessOpenWeather(params) {
        const urlParams = new URLSearchParams(Object.entries(params));

        return fetch(API_URL + urlParams)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const contents = {
                    "icon": data["weather"][0]["icon"],
                    "tempValue": parseInt(data["main"]["temp"]),
                    "tempDesc": data["weather"][0]["main"]
                };
                return contents;
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    /**
     * Updates the location information.
     * 
     * @param {string} location - The location.
     */
    function updateLocation(location) {
        const locationText = document.getElementById('location');
        locationText.innerText = location;
    }

    /**
     * Updates the icon image using openweathermap.org icons.
     * 
     * @param {string} iconID - The icon id from openweathermap.org.
     */
    function updateIcon(iconID) {
        const iconImg = document.getElementById('weatherIcon');
        const url = ICON_URL + iconID + ICON_EXT;

        iconImg.setAttribute('src', url);
    }

    /**
     * Updates the temperature information.
     * 
     * @param {number} temp - The current temperature value
     * @param {string} desc - The current temperature description
     */
    function updateTemp(temp, desc) {
        const tempValueText = document.getElementById('tempValue');
        const tempDescText = document.getElementById('tempDesc');

        tempValueText.innerHTML = temp + " &deg;F";
        tempDescText.innerText = desc;
    }
});

