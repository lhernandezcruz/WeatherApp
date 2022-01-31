package api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.QueryParam;

@Path("/data/2.5/weather")
@RegisterRestClient(configKey = "open-weather-api")
public interface OpenWeatherApiService {

  @GET
  OpenWeatherResponse getWeatherByCoordinates(@QueryParam Double lat, @QueryParam Double lon,
      @QueryParam String units, @QueryParam String appId);

  @GET
  OpenWeatherResponse getWeatherByCity(@QueryParam String q, @QueryParam String units, @QueryParam String appId);

}
