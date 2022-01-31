package cloudfunction;

import javax.enterprise.context.ApplicationScoped;

import org.jboss.resteasy.spi.HttpRequest;

@ApplicationScoped
public interface IpService {
  public String getIpAddress(HttpRequest httpRequest);
}
