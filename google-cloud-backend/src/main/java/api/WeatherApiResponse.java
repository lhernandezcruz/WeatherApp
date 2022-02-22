package api;

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
      String icon;

      public String getText() {
        return text;
      }

      public void setText(String text) {
        this.text = text;
      }

      public String getIcon() {
        return icon;
      }

      public void setIcon(String icon) {
        this.icon = icon;
      }
    }

    static class Current {
      @JsonProperty("temp_f")
      Double temperature;

      Condition condition;

      public Double getTemperature() {
        return temperature;
      }

      public void setTemperature(Double temperature) {
        this.temperature = temperature;
      }

      public Condition getCondition() {
        return condition;
      }
      
      public void setCondition(Condition condition) {
        this.condition = condition;
      }
    }

    Location location;
    Current current;

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
  
}
