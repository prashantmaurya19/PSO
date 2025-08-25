package com.PlayChess.com.UserServices.Utils;

import com.PlayChess.com.UserServices.Pojo.InServerUser;
import com.PlayChess.com.UserServices.Services.ServerInfoProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StateUtil {
  private final ServerInfoProvider sip;

  public String convertToInServerUsername(String username) {
    return sip.getServerPort() + ":" + username;
  }

  public InServerUser parse(String e) {
    String[] p = e.split(":");
    return new InServerUser(Integer.valueOf(p[0]), p[1]);
  }
}
