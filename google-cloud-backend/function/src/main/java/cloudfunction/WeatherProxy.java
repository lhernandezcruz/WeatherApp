package cloudfunction;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.Gson;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse.BodyHandlers;

import org.apache.http.client.utils.URIBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import api.AppWeatherResponse;
import api.OpenWeatherResponse;

import java.time.Duration;

/**
 * The cloud function serves as a proxy to fetch weather information from third
 * party APIs in a secure manner rather than
 * through the browser. The cloud function expects latitude and longitude as
 * part of http headers that
 * are then used to fetch weather from third party service.
 */
@Path("/")
public class WeatherProxy {
  private static String OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
  private static HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

  @ConfigProperty(name = "open.weather.api.key")
  private String openWeatherApiKey;

  @GET
  public Response hello(@HeaderParam("Latitude") Double latitude, @HeaderParam("Longitude") Double longitude)
      throws URISyntaxException, IOException, InterruptedException {
    if (latitude == null || longitude == null) {
      return Response.status(Status.BAD_REQUEST).entity("Latitude and Longitude must be provided").build();
    }

    // TODO: move open weather API to its own class and consider different weather
    // providers
    URI requestUri = new URIBuilder(URI.create(OPEN_WEATHER_API))
        .addParameter("lat", latitude.toString())
        .addParameter("lon", longitude.toString())
        .addParameter("units", "imperial")
        .addParameter("appId", openWeatherApiKey)
        .build();

    java.net.http.HttpRequest openWeatherHttpRequest = java.net.http.HttpRequest.newBuilder()
        .GET()
        .uri(requestUri)
        .build();

    // TODO: add error handling
    java.net.http.HttpResponse<String> apiResponse = client.send(openWeatherHttpRequest, BodyHandlers.ofString());
    OpenWeatherResponse openWeatherResponse = new Gson().fromJson(apiResponse.body(), OpenWeatherResponse.class);
    return Response.ok().entity(AppWeatherResponse.fromOpenWeatherApi(openWeatherResponse)).build();
  }
}
