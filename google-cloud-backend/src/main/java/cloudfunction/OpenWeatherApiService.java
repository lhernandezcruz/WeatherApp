package cloudfunction;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.QueryParam;

import api.OpenWeatherResponse;

@Path("/data/2.5/weather")
@RegisterRestClient(configKey = "open-weather-api")
public interface OpenWeatherApiService {

    @GET
    OpenWeatherResponse getWeather(@QueryParam Double lat, @QueryParam Double lon,
            @QueryParam String units, @QueryParam String appId);
}
