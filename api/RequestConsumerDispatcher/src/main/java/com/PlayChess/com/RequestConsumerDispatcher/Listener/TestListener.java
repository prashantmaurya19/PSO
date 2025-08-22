package com.PlayChess.com.RequestConsumerDispatcher.Listener;

import com.PlayChess.com.RequestConsumerDispatcher.Model.GameEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TestListener {

  @KafkaListener(topics = "game_event", groupId = "consumer")
  public void testing(GameEvent event) {

    log.info("Kafka: game_event => " + event.toString());
  }
}
