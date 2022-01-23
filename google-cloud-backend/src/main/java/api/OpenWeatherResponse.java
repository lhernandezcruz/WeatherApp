package api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Retains only a portion of the information from OpenWeather API response
 */
public class OpenWeatherResponse {
  static class MainValues {
    @JsonProperty("temp")
    Double temperature;

    public Double getTemperature() {
      return temperature;
    }

    public void setTemperature(Double temperature) {
      this.temperature = temperature;
    }

    public int getRoundedTemperature() {
      return temperature.intValue();
    }
  }

  static class WeatherDescription {
    @JsonProperty("main")
    String mainDescription;

    @JsonProperty("icon")
    String iconId;

    public String getMainDescription() {
      return mainDescription;
    }

    public void setMainDescription(String mainDescription) {
      this.mainDescription = mainDescription;
    }

    public String getIconId() {
      return iconId;
    }

    public void setIconId(String iconId) {
      this.iconId = iconId;
    }
  }

  @JsonProperty("name")
  String cityName;

  @JsonProperty("main")
  MainValues mainValues;

  @JsonProperty("weather")
  List<WeatherDescription> weatherDescriptions;

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public String getCityName() {
    return cityName;
  }

  public int getTemperature() {
    return this.mainValues.getRoundedTemperature();
  }

  public String getIconId() {
    return this.weatherDescriptions.get(0).getIconId();
  }

  public String getDescription() {
    return this.weatherDescriptions.get(0).getMainDescription();
  }
}
