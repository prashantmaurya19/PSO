package com.PlayChess.com.RequestConsumerDispatcher.Producer;

import com.PlayChess.com.RequestConsumerDispatcher.Configuration.Const;
import com.PlayChess.com.RequestConsumerDispatcher.Configuration.GameEventConst;
import com.PlayChess.com.RequestConsumerDispatcher.Model.GameEvent;
import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class GameEventProducer {
  @Autowired private KafkaTemplate<String, GameEvent> kt;

  public void push(GameRequest r1, GameRequest r2) {
    // if(!r1.getType().equals(r2.getType())){
    //   return ;
    // }
    kt.send(Const.GAME_EVENT_TOPIC, new GameEvent(r1.getUser(), r2.getUser(), GameEventConst.INIT));
    kt.send(Const.GAME_EVENT_TOPIC, new GameEvent(r2.getUser(), r1.getUser(), GameEventConst.INIT));
  }
}
