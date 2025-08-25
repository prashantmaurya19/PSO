package com.PlayChess.com.RequestConsumerDispatcher.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DevConfig {

  public ObjectMapper getObjectMapper() {
    return new ObjectMapper();
  }
}
