package com.PlayChess.com.UserServices.Listener;

import com.PlayChess.com.UserServices.Configuration.kafkaConfig;
import com.PlayChess.com.UserServices.Services.GameEventDispatcherService;
import com.PlayChess.com.UserServices.Services.ObjectMapperService;
import com.PlayChess.com.model.GameEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaServerMessageListener {
  private final GameEventDispatcherService geds;
  private final ObjectMapperService oms;

  @KafkaListener(topics = kafkaConfig.KAFKA_TOPIC_EXPRESION, groupId = "us-consumer")
  public void listen(String e) {
    // log.info(StringUtil.join("message reviced in =", e, "self pso topic"));
    GameEvent event = oms.parse(e, GameEvent.class);
    // if (!geds.isEventAccepted(event)) return;
    geds.dispatchToClient(event);
  }
}
