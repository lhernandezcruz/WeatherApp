package cloudfunction;

import javax.enterprise.context.ApplicationScoped;

import org.jboss.resteasy.spi.HttpRequest;

import io.quarkus.arc.DefaultBean;

@DefaultBean
@ApplicationScoped
public class HttpIpService implements IpService {

  @Override
  public String getIpAddress(HttpRequest httpRequest) {
    String remoteAddr = "";

    if (httpRequest != null) {
      remoteAddr = httpRequest.getHttpHeaders().getHeaderString("X-FORWARDED-FOR");
      if (remoteAddr == null || "".equals(remoteAddr)) {
        remoteAddr = httpRequest.getRemoteAddress();
      }
    }

    return remoteAddr;
  }
}
