package com.PlayChess.com.RequestConsumerDispatcher.Listener;

import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import com.PlayChess.com.RequestConsumerDispatcher.Producer.GameEventProducer;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class GameRequestListener {

  @Autowired private GameEventProducer gep;
  private HashMap<String, GameRequest> pending_players = new HashMap<>();

  @KafkaListener(topics = "game_request", groupId = "dispatchers")
  public void dispach(GameRequest request) {
    if (pending_players.getOrDefault(request.getType(), null) == null) {
      pending_players.put(request.getType(), request);
      return;
    }
    gep.push(request, pending_players.get(request.getType()));
    pending_players.put(request.getType(), null);
  }
}
