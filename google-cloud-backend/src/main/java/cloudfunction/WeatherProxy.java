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
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.spi.HttpRequest;

import api.AppWeatherResponse;
import api.IpapiService;
import api.LocationIqResponse;
import api.LocationIqService;
import api.WeatherApiResponse;
import api.WeatherApiService;

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

  static final String CITY_LOCATION_FORMAT = "%s,%s,%s";
  static final String COORDINATES_LOCATION_FORMAT = "%s,%s";

  @Inject
  @RestClient
  IpapiService ipapiService;

  @Inject
  @RestClient
  LocationIqService locationIqService;

  @Inject
  @RestClient
  WeatherApiService weatherApiService;

  @Inject
  IpService ipService;

  @ConfigProperty(name = "location.iq.api.key")
  private String locationIqApiKey;

  @ConfigProperty(name = "weather.api.key")
  private String weatherApiKey;

  @GET
  public CompletionStage<Response> getCurrentWeather(@HeaderParam("Latitude") Double latitude,
      @HeaderParam("Longitude") Double longitude, @Context HttpRequest request)
      throws URISyntaxException, IOException, InterruptedException {

    // TODO: add error handling
    if (latitude == null || longitude == null) {
      CompletionStage<WeatherApiResponse> locationWeatherFuture = ipapiService.getLocation(ipService.getIpAddress(request)).thenCompose(ipInformation -> {
        String location = String.format(CITY_LOCATION_FORMAT, ipInformation.getCity(), ipInformation.getRegionCode(), ipInformation.getCountryCode());
        return weatherApiService.getWeather(location, 3, weatherApiKey);
      });

      return locationWeatherFuture.thenApply(weatherApiResponse -> Response.ok().entity(AppWeatherResponse.fromWeatherApi(weatherApiResponse)).build());
    }

    // get the city and weather using different providers for better accuracy
    CompletableFuture<LocationIqResponse> locationIqFuture = locationIqService.getLocation(locationIqApiKey, latitude, longitude, "json").toCompletableFuture();
    String location = String.format(COORDINATES_LOCATION_FORMAT, latitude, longitude);
    CompletableFuture<WeatherApiResponse> weatherApiFuture = weatherApiService.getWeather(location, 3, weatherApiKey).toCompletableFuture();

    return CompletableFuture.allOf(locationIqFuture, weatherApiFuture).thenApplyAsync(dummy -> {
      LocationIqResponse locationIqResponse = locationIqFuture.join();
      WeatherApiResponse weatherApiResponse = weatherApiFuture.join();
      return Response.ok().entity(AppWeatherResponse.fromLocationIqAndWeatherApi(locationIqResponse, weatherApiResponse)).build();
    });
  }
}
