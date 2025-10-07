package com.PlayChess.com.UserServices.Configuration;

import com.PlayChess.com.UserServices.Services.ServerInfoProvider;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class kafkaConfig {

  @Autowired public ServerInfoProvider sip;

  public static final String KAFKA_TOPIC_EXPRESION = "${server.port}pso";

  @Value(KAFKA_TOPIC_EXPRESION)
  public static String SELF_KAFKA_MESSAGE_TOPIC;

  @Bean
  public NewTopic game_event_topic() {
    return TopicBuilder.name(SELF_KAFKA_MESSAGE_TOPIC).partitions(3).build();
  }
}
