package api;

import com.fasterxml.jackson.annotation.JsonAlias;

public class LocationIqResponse {
  public class Address {
    @JsonAlias({"city", "town", "village", "suburb"})
    String location;

    public String getLocation() {
      return location;
    }

    public void steLocation(String location) {
      this.location = location;
    }
  }

  private Address address;

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }
}
