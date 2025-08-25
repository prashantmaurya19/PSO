package com.PlayChess.com.UserServices.Controllers;

import com.PlayChess.com.UserServices.Model.GameEvent;
import com.PlayChess.com.UserServices.Model.GameRequest;
import com.PlayChess.com.UserServices.Services.KafkaProducerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class SocketClientRequestController {

  private final KafkaProducerService grps;

  @MessageMapping("/game_request")
  public void processGameRequest(GameRequest gr) {
    grps.push(gr);
  }

  @MessageMapping("/game_event")
  public void processGameEvent(GameEvent gr) {
    grps.push(gr);
  }
}
