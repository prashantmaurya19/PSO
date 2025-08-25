package com.PlayChess.com.RequestConsumerDispatcher.Configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {
  @Bean
  public NewTopic topic() {
    return TopicBuilder.name(Const.TEST_TOPIC).partitions(3).build();
  }

  @Bean
  public NewTopic game_request_topic() {
    return TopicBuilder.name(Const.GAME_REQUEST_TOPIC).partitions(3).build();
  }

  @Bean
  public NewTopic game_event_topic() {
    return TopicBuilder.name(Const.GAME_EVENT_TOPIC).partitions(3).build();
  }
}
