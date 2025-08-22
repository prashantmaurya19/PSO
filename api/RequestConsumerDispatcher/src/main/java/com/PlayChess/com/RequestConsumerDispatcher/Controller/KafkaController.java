package com.PlayChess.com.RequestConsumerDispatcher.Controller;

import com.PlayChess.com.RequestConsumerDispatcher.Configuration.Const;
import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import com.PlayChess.com.RequestConsumerDispatcher.Model.TestPojo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@Slf4j
public class KafkaController {
  @Autowired private KafkaTemplate<String, GameRequest> kafkaTemplate;

  @PostMapping("/{message}")
  public ResponseEntity<String> sendMessage(@PathVariable String message) {
    log.info("msg => " + message);

    kafkaTemplate.send(Const.GAME_REQUEST_TOPIC, new GameRequest("ThreeMin", message));
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @KafkaListener(topics = "test_topic_spring_boot", groupId = "test_t")
  public void listen(TestPojo in) {
    log.info("kafka test_t msg => " + in.getMessage());
  }
}
