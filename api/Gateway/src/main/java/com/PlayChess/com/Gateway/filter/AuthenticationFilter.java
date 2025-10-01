package com.PlayChess.com.Gateway.filter;

import com.PlayChess.com.Gateway.exception.CookieNotFound;
import com.PlayChess.com.Gateway.utils.CookieUtil;
import com.PlayChess.com.Gateway.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequest.Builder;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter
    extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

  // private static final Logger log = LoggerFactory.getLogger(AuthenticationFilter.class);
  @Autowired private JwtUtil jwtUtil;
  @Autowired private CookieUtil cu;

  public AuthenticationFilter() {
    super(Config.class);
  }

  @Override
  public GatewayFilter apply(Config config) {
    return ((exchange, chain) -> {
      Builder modifiedRequest = exchange.getRequest().mutate();
      String jwt = null, username = "";
      // log.info("Cookies = " + exchange.getRequest().getCookies().getFirst("Cookie"));
      try {
        jwt = cu.extractJwtCookies(exchange.getRequest());
        // log.info("Token = " + jwt);
      } catch (CookieNotFound e) {
        // log.info("normal user");
        return chain.filter(exchange.mutate().request(addXUserHeader(modifiedRequest, "")).build());
      }
      try {
        username = jwtUtil.extractUsername(jwt);
        // log.info("authorized user = " + username);
      } catch (Exception e) {
        // log.info("un-authorized user");
        return handleError(exchange);
      }
      return chain.filter(
          exchange.mutate().request(addXUserHeader(modifiedRequest, username)).build());
    });
  }

  public static class Config {}

  private ServerHttpRequest addXUserHeader(Builder request, String value) {
    return request.header("X-User-pso", value).build();
  }

  private Mono<Void> handleError(ServerWebExchange exchange) {
    ServerHttpResponse response = exchange.getResponse();
    response.setStatusCode(HttpStatus.UNAUTHORIZED);
    // You can add a response body here if needed.
    return response.setComplete();
  }
}
