package api;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * The public response of the weather application which provides information
 * required to
 * display current weather in https://weather.lhernandezcruz.com
 */
@RegisterForReflection
public class AppWeatherResponse {
  @RegisterForReflection
  static class Description {
    int temperature;
    String text;
    int iconCode;
    boolean isDaytime;

    public Description() {

    }

    public Description(int temperature, String text, int iconCode, boolean isDaytime) {
      this.temperature = temperature;
      this.text = text;
      this.iconCode = iconCode;
      this.isDaytime = isDaytime;
    }

    public int getTemperature() {
      return temperature;
    }

    public void setTemperature(int temperature) {
      this.temperature = temperature;
    }

    public String getText() {
      return text;
    }

    public void setText(String text) {
      this.text = text;
    }

    public int getIconCode() {
      return iconCode;
    }

    public void setIconCode(int iconCode) {
      this.iconCode = iconCode;
    }

    public boolean isDaytime() {
      return isDaytime;
    }

    public void setDaytime(boolean isDaytime) {
      this.isDaytime = isDaytime;
    }
  }

  @RegisterForReflection
  public static class Hour {
    int time;
    @JsonUnwrapped
    Description description;

    public Hour() {

    }

    public Hour(int time, int temperature, String text, int iconCode, boolean isDaytime) {
      this.time = time;
      this.description = new Description(temperature, text, iconCode, isDaytime);
    }

    public int getTime() {
      return time;
    }

    public void setTime(int time) {
      this.time = time;
    }

    public Description getDescription() {
      return description;
    }

    public void setDescription(Description description) {
      this.description = description;
    }

    public static Hour fromWeatherApiHour(WeatherApiResponse.Hour hour) {
      return new Hour(
          hour.getTimeEpoch(),
          hour.getTemperature().intValue(),
          hour.getCondition().getText(),
          hour.getCondition().getCode(),
          hour.isDaytime());
    }
  }

  String cityName;

  @JsonProperty("current")
  Description description;
  List<Hour> hourly;

  public AppWeatherResponse() {

  }

  public AppWeatherResponse(String cityName, int temperature, String description, int icon, boolean isDaytime) {
    this.cityName = cityName;
    this.description = new Description(temperature, description, icon, isDaytime);
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public Description getDescription() {
    return description;
  }

  public void setDescription(Description description) {
    this.description = description;
  }

  public List<Hour> getHourly() {
    return hourly;
  }

  public void setHourly(List<Hour> hourly) {
    this.hourly = hourly;
  }

  public void setHourly(WeatherApiResponse weatherApiResponse) {
    this.hourly = weatherApiResponse.getForecast().getForcastDays()
      .stream()
      .map(forcastday -> forcastday.getHourly())
      .flatMap(Collection::stream)
      .map(weatherApiHour -> Hour.fromWeatherApiHour(weatherApiHour))
      .collect(Collectors.toList());
  }

  public static AppWeatherResponse fromLocationIqAndWeatherApi(LocationIqResponse locationIqResponse,
      WeatherApiResponse weatherApiResponse) {

    AppWeatherResponse appWeatherResponse = AppWeatherResponse.fromWeatherApi(weatherApiResponse);
    appWeatherResponse.setCityName(locationIqResponse.getAddress().getCity());
    return appWeatherResponse;
  }

  public static AppWeatherResponse fromWeatherApi(WeatherApiResponse weatherApiResponse) {
    AppWeatherResponse appWeatherResponse = new AppWeatherResponse(
        weatherApiResponse.getLocation().getName(),
        weatherApiResponse.getCurrent().getTemperature().intValue(),
        weatherApiResponse.getCurrent().getCondition().getText(),
        weatherApiResponse.getCurrent().getCondition().getCode(),
        weatherApiResponse.getCurrent().isDaytime());
        appWeatherResponse.setHourly(weatherApiResponse);
    appWeatherResponse.setHourly(weatherApiResponse);
    return appWeatherResponse;
  }
}
