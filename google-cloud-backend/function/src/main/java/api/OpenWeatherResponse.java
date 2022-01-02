package api;

import java.util.List;

import com.google.gson.annotations.SerializedName;

/**
 * Retains only a portion of the information from OpenWeather API response
 */
public class OpenWeatherResponse {
  class MainValues {
    @SerializedName("temp")
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

  class WeatherDescription {
    @SerializedName("main")
    String mainDescription;

    @SerializedName("icon")
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

  @SerializedName("name")
  String cityName;

  @SerializedName("main")
  MainValues mainValues;

  @SerializedName("weather")
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
