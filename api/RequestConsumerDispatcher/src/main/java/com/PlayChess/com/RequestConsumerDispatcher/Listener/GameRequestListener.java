package com.PlayChess.com.RequestConsumerDispatcher.Listener;

import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import com.PlayChess.com.RequestConsumerDispatcher.Producer.GameEventProducer;
import com.PlayChess.com.RequestConsumerDispatcher.Services.ObjectMapperService;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class GameRequestListener {

  private final ObjectMapperService oms;
  private final GameEventProducer gep;
  private final HashMap<String, GameRequest> pending_players = new HashMap<>();

  @KafkaListener(topics = "game_request", groupId = "rcp-consumers")
  public void dispach(String payload) {
    try {
      GameRequest request = oms.parse(payload, GameRequest.class);
      if (pending_players.getOrDefault(request.getType(), null) == null) {
        pending_players.put(request.getType(), request);
        return;
      }
      gep.push(request, pending_players.get(request.getType()));
      pending_players.put(request.getType(), null);
    } catch (Exception e) {

      log.error(e.getMessage());
    }
  }
}
