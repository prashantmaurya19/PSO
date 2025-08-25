package com.PlayChess.com.UserServices.Listener;

import com.PlayChess.com.UserServices.Model.GameEvent;
import com.PlayChess.com.UserServices.Services.GameEventDispatcherService;
import com.PlayChess.com.UserServices.Services.ObjectMapperService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameEventListener {

  private final GameEventDispatcherService geds;
  private final ObjectMapperService oms;

  @KafkaListener(topics = "game_event", groupId = "us-consumer")
  public void notifyToClient(String e) {
    GameEvent event = oms.parse(e, GameEvent.class);
    // push update to client via websocket
    if (!geds.isEventAccepted(event)) return;
    geds.dispatchToClient(event);
  }
}
