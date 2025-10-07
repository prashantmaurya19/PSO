package com.PlayChess.com.UserServices.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerInfoProvider {

  private final ServletWebServerApplicationContext server;

  public int getServerPort() {
    return server.getWebServer().getPort();
  }

  public String getKafkaServerTopic() {
    return this.getServerPort() + "pso";
  }
}
