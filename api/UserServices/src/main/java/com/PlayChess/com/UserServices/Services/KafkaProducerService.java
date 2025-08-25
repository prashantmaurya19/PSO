package com.PlayChess.com.UserServices.Services;

import com.PlayChess.com.UserServices.Configuration.KafkaConst;
import com.PlayChess.com.UserServices.Model.GameEvent;
import com.PlayChess.com.UserServices.Model.GameRequest;
import com.PlayChess.com.UserServices.Utils.StateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {
  private final KafkaTemplate<String, String> kafkaTemplate;
  private final StateUtil su;
  private final ObjectMapperService oms;

  public void push(GameRequest gr) {
    gr.setUser(su.convertToInServerUsername(gr.getUser()));
    kafkaTemplate.send(KafkaConst.GAME_REQUEST_TOPIC, oms.stringify(gr));
  }

  public void push(GameEvent gr) {
    kafkaTemplate.send(KafkaConst.GAME_EVENT_TOPIC, oms.stringify(gr));
  }
}
