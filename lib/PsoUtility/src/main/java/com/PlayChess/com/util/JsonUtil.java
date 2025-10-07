package com.PlayChess.com.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

  private static final ObjectMapper mapper = new ObjectMapper();

  public static String stringify(Object a) {
    try {
      return mapper.writeValueAsString(a);
    } catch (Exception e) {
      return null;
    }
  }

  public static <T> T parse(String json_str, Class<T> c) {
    try {
      return mapper.readValue(json_str, c);
    } catch (Exception e) {
      return null;
    }
  }
}
