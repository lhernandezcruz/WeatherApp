package api;

import java.util.concurrent.CompletionStage;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.QueryParam;

@Path("/v1/forecast.json")
@RegisterRestClient(configKey = "weather-api")
public interface WeatherApiService {

  @GET
  CompletionStage<WeatherApiResponse> getWeather(@QueryParam String q, @QueryParam int days, @QueryParam String key);
}
