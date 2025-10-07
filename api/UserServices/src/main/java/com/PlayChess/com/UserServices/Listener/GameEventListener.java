package com.PlayChess.com.UserServices.Listener;

import com.PlayChess.com.UserServices.Services.GameEventDispatcherService;
import com.PlayChess.com.UserServices.Services.ObjectMapperService;
import com.PlayChess.com.constants.KafkaTopics;
import com.PlayChess.com.model.GameEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GameEventListener {

  private final GameEventDispatcherService geds;
  private final ObjectMapperService oms;

  @KafkaListener(topics = KafkaTopics.GAME_EVENT_TOPIC, groupId = "us-consumer")
  public void notifyToClient(String e) {
    GameEvent event = oms.parse(e, GameEvent.class);
    if (!geds.isEventAccepted(event)) return;
    geds.dispatchToClient(event);
  }
}
