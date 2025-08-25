package com.PlayChess.com.RequestConsumerDispatcher.Producer;

import com.PlayChess.com.RequestConsumerDispatcher.Configuration.Const;
import com.PlayChess.com.RequestConsumerDispatcher.Configuration.GameEventConst;
import com.PlayChess.com.RequestConsumerDispatcher.Model.*;
import com.PlayChess.com.RequestConsumerDispatcher.Services.ObjectMapperService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameEventProducer {
  private final ObjectMapperService oms;
  private final KafkaTemplate<String, String> kt;

  private void pushGameEvent(GameEvent e) {
    kt.send(Const.GAME_EVENT_TOPIC, oms.stringify(e));
  }

  public void pushGameRequest(GameRequest gr) {
    kt.send(Const.GAME_REQUEST_TOPIC, oms.stringify(gr));
  }

  public void push(GameRequest r1, GameRequest r2) {
    // if(!r1.getType().equals(r2.getType())){
    //   return ;
    // }
    pushGameEvent(new GameEvent(r1.getUser(), r2.getUser(), GameEventConst.INIT));
    pushGameEvent(new GameEvent(r2.getUser(), r1.getUser(), GameEventConst.INIT));
  }
}
