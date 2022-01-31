package cloudfunction;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import java.io.IOException;
import java.net.URISyntaxException;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.spi.HttpRequest;

import api.AppWeatherResponse;
import api.IpapiResponse;
import api.IpapiService;
import api.OpenWeatherApiService;
import api.OpenWeatherResponse;

/**
 * The cloud function serves as a proxy to fetch weather information from third
 * party API in a secure manner rather than
 * through the browser. The cloud function expects latitude and longitude as
 * part of http headers which are then used to fetch weather from third party
 * service.
 */
@Path("/")
@ApplicationScoped
public class WeatherProxy {

  static final String LOCATION_FORMAT = "%s,%s,%s";

  @Inject
  @RestClient
  OpenWeatherApiService openWeatherApiService;

  @Inject
  @RestClient
  IpapiService ipapiService;

  @Inject
  IpService locationService;

  @ConfigProperty(name = "open.weather.api.key")
  private String openWeatherApiKey;

  @GET
  public Response getCurrentWeather(@HeaderParam("Latitude") Double latitude,
      @HeaderParam("Longitude") Double longitude, @Context HttpRequest request)
      throws URISyntaxException, IOException, InterruptedException {

    OpenWeatherResponse apiResponse = null;
    // TODO: add error handling
    if (latitude == null || longitude == null) {
      IpapiResponse ipInformation = ipapiService.getLocation(locationService.getIpAddress(request));
      String location = String.format(LOCATION_FORMAT, ipInformation.getCity(), ipInformation.getRegionCode(), ipInformation.getCountryCode());
      apiResponse = openWeatherApiService.getWeatherByCity(location, "imperial", openWeatherApiKey);
    } else {
      apiResponse = openWeatherApiService.getWeatherByCoordinates(latitude, longitude, "imperial", openWeatherApiKey);
    }

    return Response.ok().entity(AppWeatherResponse.fromOpenWeatherApi(apiResponse)).build();
  }
}
