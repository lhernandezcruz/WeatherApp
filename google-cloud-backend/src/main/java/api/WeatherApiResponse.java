package api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherApiResponse {
    static class Location {
      String name;
      String country;

      public String getName() {
        return name;
      }

      public void setName(String name) {
        this.name = name;
      }

      public String getCountry() {
        return country;
      }

      public void setCountry(String country) {
        this.country = country;
      }
    }

    static class Condition {
      String text;
      int code;

      public String getText() {
        return text;
      }

      public void setText(String text) {
        this.text = text;
      }

      public int getCode() {
        return code;
      }

      public void setCode(int code) {
        this.code = code;
      }
    }

    static class Current {
      @JsonProperty("temp_f")
      Double temperature;

      @JsonProperty("is_day")
      boolean isDaytime;

      Condition condition;

      public Double getTemperature() {
        return temperature;
      }

      public void setTemperature(Double temperature) {
        this.temperature = temperature;
      }

      public boolean isDaytime() {
        return isDaytime;
      }

      public void setDaytime(boolean isDaytime) {
        this.isDaytime = isDaytime;
      }

      public Condition getCondition() {
        return condition;
      }
      
      public void setCondition(Condition condition) {
        this.condition = condition;
      }
    }

    public static class Hour {
      @JsonProperty("time_epoch")
      int timeEpoch;

      @JsonProperty("temp_f")
      Double temperature;

      @JsonProperty("is_day")
      boolean isDaytime;

      Condition condition;

      public int getTimeEpoch() {
        return timeEpoch;
      }

      public void setTimeEpoch(int timeEpoch) {
        this.timeEpoch = timeEpoch;
      }

      public Double getTemperature() {
        return temperature;
      }

      public void setTemperature(Double temperature) {
        this.temperature = temperature;
      }

      public boolean isDaytime() {
        return isDaytime;
      }

      public void setDaytime(boolean isDaytime) {
        this.isDaytime = isDaytime;
      }

      public Condition getCondition() {
        return condition;
      }

      public void setCondition(Condition condition) {
        this.condition = condition;
      }
    }

    public static class Day {
      @JsonProperty("mintemp_f")
      Double minTemp;

      @JsonProperty("maxtemp_f")
      Double maxTemp;

      Condition condition;

      public Double getMinTemp() {
        return minTemp;
      }

      public void setMinTemp(Double minTemp) {
        this.minTemp = minTemp;
      }

      public Double getMaxTemp() {
        return maxTemp;
      }

      public void setMaxTemp(Double maxTemp) {
        this.maxTemp = maxTemp;
      }

      public Condition getCondition() {
        return condition;
      }

      public void setCondition(Condition condition) {
        this.condition = condition;
      }
    }

    public static class ForecastDay {
      @JsonProperty("date_epoch")
      int dateEpoch;

      Day day;

      @JsonProperty("hour")
      List<Hour> hourly;

      public int getDateEpoch() {
        return dateEpoch;
      }

      public void setDateEpoch(int dateEpoch) {
        this.dateEpoch = dateEpoch;
      }

      public Day getDay() {
        return day;
      }

      public void setDay(Day day) {
        this.day = day;
      }

      public List<Hour> getHourly() {
        return hourly;
      }

      public void setHourly(List<Hour> hourly) {
        this.hourly = hourly;
      }
    }

    public static class Forecast {
      @JsonProperty("forecastday")
      List<ForecastDay> forecastDays;

      public List<ForecastDay> getForcastDays() {
        return forecastDays;
      }

      public void setForecastDays(List<ForecastDay> forecastDays) {
        this.forecastDays = forecastDays;
      }
    }

    Location location;
    Current current;
    Forecast forecast;

    public Location getLocation() {
      return location;
    }

    public void setLocation(Location location) {
      this.location = location;
    }

    public Current getCurrent() {
      return current;
    }

    public void setCurrent(Current current) {
      this.current = current;
    }

    public Forecast getForecast() {
      return forecast;
    }

    public void setForecast(Forecast forecast) {
      this.forecast = forecast;
    }
  
}
