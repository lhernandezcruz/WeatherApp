package api;

import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * The public response of the weather application which provides information
 * required to
 * display current weather in https://weather.lhernandezcruz.com
 */
@RegisterForReflection
public class AppWeatherResponse {
  @RegisterForReflection
  static class Current {
    int temperature;
    String description;
    String icon;

    public Current() {

    }

    public Current(int temperature, String description, String icon) {
      this.temperature = temperature;
      this.description = description;
      this.icon = icon;
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

    public String getIcon() {
      return icon;
    }

    public void setIcon(String icon) {
      this.icon = icon;
    }
  }

  String cityName;
  Current current;

  public AppWeatherResponse() {

  }

  public AppWeatherResponse(String cityName, int temperature, String description, String iconId) {
    this.cityName = cityName;
    this.current = new Current(temperature, description, iconId);
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public Current getCurrent() {
    return current;
  }

  public void setCurrent(Current current) {
    this.current = current;
  }

  public static AppWeatherResponse fromLocationIqAndWeatherApi(LocationIqResponse locationIqResponse,
      WeatherApiResponse weatherApiResponse) {
    return new AppWeatherResponse(
        locationIqResponse.getAddress().getCity(),
        weatherApiResponse.getCurrent().getTemperature().intValue(),
        weatherApiResponse.getCurrent().getCondition().getText(),
        weatherApiResponse.getCurrent().getCondition().getIcon());
  }

  public static AppWeatherResponse fromWeatherApi(WeatherApiResponse weatherApiResponse) {
    return new AppWeatherResponse(
        weatherApiResponse.getLocation().getName(),
        weatherApiResponse.getCurrent().getTemperature().intValue(),
        weatherApiResponse.getCurrent().getCondition().getText(),
        weatherApiResponse.getCurrent().getCondition().getIcon());
  }
}
