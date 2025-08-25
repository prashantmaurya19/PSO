package com.PlayChess.com.RequestConsumerDispatcher.Services;

import com.PlayChess.com.RequestConsumerDispatcher.Model.GameEvent;
import com.PlayChess.com.RequestConsumerDispatcher.Model.GameRequest;
import com.PlayChess.com.RequestConsumerDispatcher.Util.JsonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ObjectMapperService {
  private final JsonUtil ju;

  public String stringify(GameRequest a) {
    return ju.stringify(a);
  }

  public String stringify(GameEvent a){
    return ju.stringify(a);
  }

  public <T> T parse(String json_str, Class<T> c) {
    return ju.parse(json_str, c);
  }
}
