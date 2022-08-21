package api;

import com.fasterxml.jackson.annotation.JsonAlias;

public class LocationIqResponse {
  public class Address {
    @JsonAlias({"city", "town", "village", "suburb"})
    String location;

    public String getLocation() {
      return location;
    }

    public void setLocation(String location) {
      this.location = location;
    }
  }

  private Address address;
  private double lat;
  private double lon;


  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public double getLat() {
    return lat;
  }

  public void setLat(double lat) {
    this.lat = lat;
  }

  public double getLon() {
    return lon;
  }

  public void setLon(double lon) {
    this.lon = lon;
  }
}
