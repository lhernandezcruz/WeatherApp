package api;

import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * The public response of the weather application which provides information
 * required to
 * display current weather in https://weather.lhernandezcruz.com
 */
@RegisterForReflection
public class AppWeatherResponse {
  String cityName;
  int temperature;
  String description;
  String iconId;

  public AppWeatherResponse() {

  }

  public AppWeatherResponse(String cityName, int temperature, String description, String iconId) {
    this.cityName = cityName;
    this.temperature = temperature;
    this.description = description;
    this.iconId = iconId;
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public int getTemperature() {
    return temperature;
  }

  public void setTemperature(int temperature) {
    this.temperature = temperature;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getIconId() {
    return iconId;
  }

  public void setIconId(String iconId) {
    this.iconId = iconId;
  }

  public static AppWeatherResponse fromOpenWeatherApi(OpenWeatherResponse openWeatherResponse) {
    return new AppWeatherResponse(
        openWeatherResponse.getCityName(),
        openWeatherResponse.getTemperature(),
        openWeatherResponse.getDescription(),
        openWeatherResponse.getIconId());
  }
}
