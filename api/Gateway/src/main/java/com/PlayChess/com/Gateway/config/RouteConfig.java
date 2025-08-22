package com.PlayChess.com.Gateway.config;


import org.springframework.context.annotation.Configuration;

@Configuration
class RouteConfiguration {
  // @Bean
  // public RouterFunction<ServerResponse> applicationRoute(AuthenticationFilter af) {
  //   return route("PSO-SERVICES")
  //       .route(path("/ps/**"), http())
  //       .filter(lb("PSO-SERVICES"))
  //       .filter(af)
  //       // .after(removeResponseHeader("Access-Control-Allow-Origin"))
  //       .build();
  // }

  // @Bean
  // public RouterFunction<ServerResponse> gatewayRouterFunctionsAddReqParameter(
  //     AuthenticationFilter af) {
  //   return route("USER-REGISTRY")
  //       .route(path("/ur/**"), http())
  //       .filter(lb("USER-REGISTRY"))
  //       .filter(af)
  //       .build();
  // }
}
