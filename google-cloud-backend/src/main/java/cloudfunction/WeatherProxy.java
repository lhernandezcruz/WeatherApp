package cloudfunction;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import java.io.IOException;
import java.net.URISyntaxException;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import api.AppWeatherResponse;
import api.OpenWeatherResponse;

/**
 * The cloud function serves as a proxy to fetch weather information from third
 * party API in a secure manner rather than
 * through the browser. The cloud function expects latitude and longitude as
 * part of http headers which are then used to fetch weather from third party
 * service.
 */
@Path("/")
public class WeatherProxy {

  @Inject
  @RestClient
  OpenWeatherApiService openWeatherApiService;

  @ConfigProperty(name = "open.weather.api.key")
  private String openWeatherApiKey;

  @GET
  public Response getCurrentWeather(@HeaderParam("Latitude") Double latitude,
      @HeaderParam("Longitude") Double longitude)
      throws URISyntaxException, IOException, InterruptedException {
    if (latitude == null || longitude == null) {
      return Response.status(Status.BAD_REQUEST).entity("Latitude and Longitude must be provided").build();
    }

    // TODO: add error handling
    OpenWeatherResponse apiResponse = openWeatherApiService.getWeather(latitude, longitude, "imperial",
        openWeatherApiKey);
    return Response.ok().entity(AppWeatherResponse.fromOpenWeatherApi(apiResponse)).build();
  }
}
