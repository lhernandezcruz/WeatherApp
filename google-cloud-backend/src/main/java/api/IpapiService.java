package api;

import java.util.concurrent.CompletionStage;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/")
@RegisterRestClient(configKey = "ipapi")
public interface IpapiService {

    @GET
    @Path("/{ipAddress}/json")
    CompletionStage<IpapiResponse> getLocation(@PathParam String ipAddress);
}
