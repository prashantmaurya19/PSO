package com.PlayChess.com.Authentication.Configurations;

import com.PlayChess.com.Authentication.Pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

  public <K, V> RedisTemplate<K, V> getRedisTemplate(
      RedisConnectionFactory factory, RedisSerializer<V> value_serializer) {
    RedisTemplate<K, V> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(factory);
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(value_serializer);
    return redisTemplate;
  }

  @Bean
  public RedisTemplate<String, User> redisTemplateUser(RedisConnectionFactory factory) {
    return getRedisTemplate(factory, new Jackson2JsonRedisSerializer<User>(User.class));
  }
}
