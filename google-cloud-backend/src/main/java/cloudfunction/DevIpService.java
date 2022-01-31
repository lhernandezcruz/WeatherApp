package cloudfunction;

import javax.enterprise.context.ApplicationScoped;
import org.jboss.resteasy.spi.HttpRequest;

import io.quarkus.arc.profile.IfBuildProfile;

@IfBuildProfile("dev")
@ApplicationScoped
public class DevIpService implements IpService {

  @Override
  public String getIpAddress(HttpRequest httpRequest) {
    // Mountain View, CA IP address
    return "66.102.9.46";
  }
}
