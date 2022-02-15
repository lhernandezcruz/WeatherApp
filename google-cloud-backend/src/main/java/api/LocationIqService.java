package api;

import java.util.concurrent.CompletionStage;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.QueryParam;

@Path("/")
@RegisterRestClient(configKey = "location-iq")
public interface LocationIqService {
  
  @GET
  @Path("v1/reverse.php")
  CompletionStage<LocationIqResponse> getLocation(@QueryParam String key, @QueryParam Double lat, @QueryParam Double lon, @QueryParam String format);
}
