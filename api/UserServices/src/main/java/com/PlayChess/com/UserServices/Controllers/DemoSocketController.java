package com.PlayChess.com.UserServices.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class DemoSocketController {

  @MessageMapping("/demo")
  @SendTo("/t1/tdemo")
  public String demoMessaging(String msg) {
    log.info("WebSocket messge : " + msg);
    return msg;
  }
}
