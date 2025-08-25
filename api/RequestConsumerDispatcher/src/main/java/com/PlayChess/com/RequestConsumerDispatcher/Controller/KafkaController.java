package com.PlayChess.com.RequestConsumerDispatcher.Controller;

import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import com.PlayChess.com.RequestConsumerDispatcher.Producer.GameEventProducer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@Slf4j
@RequiredArgsConstructor
public class KafkaController {

  private final GameEventProducer kp;

  @PostMapping("/{message}")
  public ResponseEntity<String> sendMessage(@PathVariable String message) {
    log.info("msg => " + message);

    GameRequest gr = new GameRequest("ThreeMin", message);
    
    kp.pushGameRequest(gr);
    return new ResponseEntity<>(message, HttpStatus.OK);
  }
}
