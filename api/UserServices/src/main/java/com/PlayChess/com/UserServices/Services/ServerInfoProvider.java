package com.PlayChess.com.UserServices.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class ServerInfoProvider {

  @Autowired private ServletWebServerApplicationContext server;

  public int getServerPort() {
    return server.getWebServer().getPort();
  }
}
