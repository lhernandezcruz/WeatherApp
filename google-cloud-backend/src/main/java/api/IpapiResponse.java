package api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IpapiResponse {
  String city;
  @JsonProperty("region_code")
  String regionCode;
  @JsonProperty("country_code")
  String countryCode;

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getRegionCode() {
    return regionCode;
  }

  public void setRegionCode(String regionCode) {
    this.regionCode = regionCode;
  }

  public String getCountryCode() {
    return countryCode;
  }

  public void setCountryCode(String countryCode) {
    this.countryCode = countryCode;
  }
}
