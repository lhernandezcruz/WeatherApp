/**
 * currentTemp will be global variables of temperature and units of temp.
 */
var currentTemp;
var currentUnit;

/*
 *  updateIcon
 *    input: iconID
 *    takes in iconID and gets icon from openweathermap.org
 */
function updateIcon(iconID) {
  // add image icon
  $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + iconID + ".png");
};

/*
 *  when tempButton is clicked, change from Celcius to Farenheight and vice versa
 */
$("#temp").on('click', '#tempButton', function() {
  // call updateTemp() with the info
  updateTemp(currentTemp, currentUnit);
});

/*
 *  updateTemp
 *    input: temp, unit
 *    update the information displayed about the temperature
 */
function updateTemp(temp, unit) {
  // if it is currently in Celcius, update to Farenheit
  //   else update to Celcius
  if (unit === "C") {
    var corT = (temp * 9 / 5) + 32;
    currentTemp= parseInt(corT, 10);
    currentUnit="F";
    $("#temp").html(currentTemp + " &deg;<button id=\"tempButton\" class=\"tempButton1\">F</button>");
  } else {
    var corT = (temp - 32) * 5 / 9;
    currentTemp = parseInt(corT, 10);
    currentUnit = "C";
    $("#temp").html(currentTemp + " &deg;<button id=\"tempButton\" class=\"tempButton1\">C</button>");
  }
};

$(document).ready(function() {
  // upon loading the page
  //get city and country, update html elements
  var city = geoplugin_city();
  var countryCode = geoplugin_countryCode();
  $("#location").html(city + ", " + countryCode);

  // get JSON stuff
  // get info and update appropriate things
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + countryCode + "&units=metric&appid=cff5475be78d7ccc46d0b2ccf804d821", function(json) {
    var icon = json["weather"][0]["icon"];
    updateIcon(icon);
    var weatherDesc = json["weather"][0]["description"];

    $("#tempDesc").html(weatherDesc);
    currentTemp = parseInt(json["main"]["temp"], 10);
    currentUnit = "C";
    updateTemp(currentTemp,currentUnit);
  });
});