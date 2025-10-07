package com.PlayChess.com.UserServices.Services;

import com.PlayChess.com.UserServices.Utils.StateUtil;
import com.PlayChess.com.constants.KafkaTopics;
import com.PlayChess.com.model.GameEvent;
import com.PlayChess.com.model.GameRequest;
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
    kafkaTemplate.send(KafkaTopics.GAME_REQUEST_TOPIC, oms.stringify(gr));
  }

  public void push(GameEvent gr) {
    kafkaTemplate.send(KafkaTopics.GAME_EVENT_TOPIC, oms.stringify(gr));
  }
}
