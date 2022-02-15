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
  @RestClient
  LocationIqService locationIqService;

  @Inject
  IpService ipService;

  @ConfigProperty(name = "open.weather.api.key")
  private String openWeatherApiKey;

  @ConfigProperty(name = "location.iq.api.key")
  private String locationIqApiKey;

  @GET
  public CompletionStage<Response> getCurrentWeather(@HeaderParam("Latitude") Double latitude,
      @HeaderParam("Longitude") Double longitude, @Context HttpRequest request)
      throws URISyntaxException, IOException, InterruptedException {

    // TODO: add error handling
    if (latitude == null || longitude == null) {
      CompletionStage<OpenWeatherResponse> locationWeatherFuture = ipapiService.getLocation(ipService.getIpAddress(request)).thenCompose(ipInformation -> {
        String location = String.format(LOCATION_FORMAT, ipInformation.getCity(), ipInformation.getRegionCode(), ipInformation.getCountryCode());
        return openWeatherApiService.getWeatherByCity(location, "imperial", openWeatherApiKey);
      });

      return locationWeatherFuture.thenApply(openWeatherResponse -> Response.ok().entity(AppWeatherResponse.fromOpenWeatherApi(openWeatherResponse)).build());
    }

    // get the city and weather using different providers for better accuracy
    CompletableFuture<LocationIqResponse> locationIqFuture = locationIqService.getLocation(locationIqApiKey, latitude, longitude, "json").toCompletableFuture();
    CompletableFuture<OpenWeatherResponse> openWeatherFuture = openWeatherApiService.getWeatherByCoordinates(latitude, longitude, "imperial", openWeatherApiKey).toCompletableFuture();

    return CompletableFuture.allOf(locationIqFuture, openWeatherFuture).thenApplyAsync(dummy -> {
      LocationIqResponse locationIqResponse = locationIqFuture.join();
      OpenWeatherResponse openWeatherResponse = openWeatherFuture.join();
      return Response.ok().entity(AppWeatherResponse.fromLocationIqAndOpenWeatherApi(locationIqResponse, openWeatherResponse)).build();
    });
  }
}
