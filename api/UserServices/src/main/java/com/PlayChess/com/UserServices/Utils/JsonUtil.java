package com.PlayChess.com.UserServices.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JsonUtil {

  private final ObjectMapper mapper;

  public String stringify(Object a) {
    try {
      return mapper.writeValueAsString(a);
    } catch (Exception e) {
      return null;
    }
  }

  public <T> T parse(String json_str, Class<T> c) {
    try {
      return mapper.readValue(json_str, c);
    } catch (Exception e) {
      return null;
    }
  }
}
