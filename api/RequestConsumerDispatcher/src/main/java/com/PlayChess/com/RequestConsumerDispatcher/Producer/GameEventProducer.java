package com.PlayChess.com.RequestConsumerDispatcher.Producer;

import com.PlayChess.com.RequestConsumerDispatcher.Services.ObjectMapperService;
import com.PlayChess.com.constants.GameEventNames;
import com.PlayChess.com.constants.KafkaTopics;
import com.PlayChess.com.model.GameEvent;
import com.PlayChess.com.model.GameRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameEventProducer {
  private final ObjectMapperService oms;
  private final KafkaTemplate<String, String> kt;

  private void pushGameEvent(GameEvent e) {
    // kt.send(KafkaTopics.GAME_EVENT_TOPIC, oms.stringify(e));
    kt.send(e.getTo().split(":")[0] + "pso", oms.stringify(e));
  }

  public void pushGameRequest(GameRequest gr) {
    kt.send(KafkaTopics.GAME_REQUEST_TOPIC, oms.stringify(gr));
  }

  public void push(GameRequest r1, GameRequest r2) {
    pushGameEvent(
        new GameEvent(r1.getUser(), r2.getUser(), GameEventNames.INIT, "{\"side\":\"b\"}"));
    pushGameEvent(
        new GameEvent(r2.getUser(), r1.getUser(), GameEventNames.INIT, "{\"side\":\"w\"}"));
  }
}
