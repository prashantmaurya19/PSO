package com.PlayChess.com.RequestConsumerDispatcher.Services;

import com.PlayChess.com.model.GameEvent;
import com.PlayChess.com.model.GameRequest;
import com.PlayChess.com.util.JsonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ObjectMapperService {

  public String stringify(GameRequest a) {
    return JsonUtil.stringify(a);
  }

  public String stringify(GameEvent a) {
    return JsonUtil.stringify(a);
  }

  public <T> T parse(String json_str, Class<T> c) {
    return JsonUtil.parse(json_str, c);
  }
}
