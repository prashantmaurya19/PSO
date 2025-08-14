package com.PlayChess.com.UserServices.Configuration;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.setApplicationDestinationPrefixes("/w1");
    registry.enableSimpleBroker("/t1");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry
        .addEndpoint("/ws/v1")
        .addInterceptors(
            new HandshakeInterceptor() {
              @Override
              public boolean beforeHandshake(
                  ServerHttpRequest request,
                  ServerHttpResponse response,
                  WebSocketHandler wsHandler,
                  Map<String, Object> attributes)
                  throws Exception {

                // String username =
                //     ((ServletServerHttpResponse) response)
                //         .getServletResponse()
                //         .getHeader(JwtHeaderEnum.VERIFIED_USER);

                // if ((username == null ? "" : username).equals("")) return false;

                return true;
              }

              @Override
              public void afterHandshake(
                  ServerHttpRequest request,
                  ServerHttpResponse response,
                  WebSocketHandler wsHandler,
                  Exception exception) {
                if (exception != null) {
                  log.info("Handshake failed: " + exception.getMessage());
                }
              }
            })
        .setAllowedOrigins("http://localhost:7000/")
        .withSockJS()
        .setSuppressCors(true);
  }

  //   @Override
  //   public void configureClientInboundChannel(ChannelRegistration registration) {
  //     registration.interceptors(
  //         new ChannelInterceptor() {
  //           @Override
  //           public Message<?> preSend(Message<?> message, MessageChannel channel) {
  //             StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
  //             if (StompCommand.CONNECT.equals(accessor.getCommand())) {
  //               log.info("" + accessor.getHeader("Cookie"));
  //             }
  //             return message;
  //           }
  //         });
  //   }
}
