package cloudfunction;

import javax.enterprise.context.ApplicationScoped;
import javax.net.ssl.HttpsURLConnection;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.gson.Gson;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpResponse.BodyHandlers;

import org.apache.http.client.utils.URIBuilder;

import api.AppWeatherResponse;
import api.OpenWeatherResponse;

import java.time.Duration;
import java.util.Optional;

/**
 * The cloud function serves as a proxy to fetch weather information from third
 * party APIs in a secure manner rather than
 * through the browser. The cloud function expects latitude and longitude as
 * part of http headers that
 * are then used to fetch weather from third party service.
 */
@ApplicationScoped
public class WeatherProxy implements HttpFunction {
  private static String OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
  private static HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();

  @Override
  public void service(HttpRequest request, HttpResponse response)
      throws Exception {

    response.appendHeader("Access-Control-Allow-Origin", "*");
    if ("OPTIONS".equals(request.getMethod())) {
      response.appendHeader("Access-Control-Allow-Methods", "GET");
      response.appendHeader("Access-Control-Allow-Headers", "Latitude, Longitude");
      response.appendHeader("Access-Control-Max-Age", "3600");
      response.setStatusCode(HttpsURLConnection.HTTP_NO_CONTENT);
      return;
    }

    if (!request.getMethod().equals("GET")) {
      response.setStatusCode(HttpsURLConnection.HTTP_BAD_METHOD);
      return;
    }

    Double latitude = parseCoordinate(getHeaderIgnoreCase(request, "Latitude").orElse(null));
    Double longitude = parseCoordinate(getHeaderIgnoreCase(request, "Longitude").orElse(null));

    if (latitude == null || longitude == null) {
      response.setStatusCode(HttpsURLConnection.HTTP_BAD_REQUEST, "latitude and longitude must be provied");
      return;
    }

    String apiKey = Optional.ofNullable(System.getenv("OPEN_WEATHER_API_KEY")).orElse(null);
    if (apiKey == null) {
      response.setStatusCode(HttpsURLConnection.HTTP_INTERNAL_ERROR);
      return;
    }

    // TODO: move open weather API to its own class and consider different weather
    // providers
    URI requestUri = new URIBuilder(URI.create(OPEN_WEATHER_API))
        .addParameter("lat", latitude.toString())
        .addParameter("lon", longitude.toString())
        .addParameter("units", "imperial")
        .addParameter("appId", apiKey)
        .build();

    java.net.http.HttpRequest openWeatherHttpRequest = java.net.http.HttpRequest.newBuilder()
        .GET()
        .uri(requestUri)
        .build();

    java.net.http.HttpResponse<String> apiResponse = client.send(openWeatherHttpRequest, BodyHandlers.ofString());
    OpenWeatherResponse openWeatherResponse = new Gson().fromJson(apiResponse.body(), OpenWeatherResponse.class);

    response.setContentType("application/json");
    response.getWriter().write(new Gson().toJson(AppWeatherResponse.fromOpenWeatherApi(openWeatherResponse)));
  }

  /**
   * Turns to coordinate value into a double to ensure validity
   *
   * @param coordinate value to be parsed
   * @return null if coordinate cannot be parsed, otherwise double value of
   *         coordinate
   */
  private Double parseCoordinate(String coordinate) {
    try {
      return Double.parseDouble(coordinate);
    } catch (NumberFormatException | NullPointerException ex) {
      return null;
    }
  }

  /**
   * Get header ignoring case
   */
  private Optional<String> getHeaderIgnoreCase(HttpRequest httpRequest, String headerName) {
    return httpRequest.getHeaders().keySet()
        .stream()
        .filter(header -> {
          return header.equalsIgnoreCase(headerName);
        })
        .findFirst()
        .flatMap(matchedHeader -> {
          return httpRequest.getFirstHeader(matchedHeader);
        });
  }
}