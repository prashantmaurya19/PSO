package com.PlayChess.com.UserServices.Services;

import com.PlayChess.com.UserServices.Model.GameEvent;
import com.PlayChess.com.UserServices.Pojo.InServerUser;
import com.PlayChess.com.UserServices.Utils.StateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameEventDispatcherService {
  private final StateUtil su;
  private final SimpMessagingTemplate messagingTemplate;
  private final ServerInfoProvider sip;

  public void dispatchToClient(GameEvent event) {
    InServerUser u = su.parse(event.getTo());
    log.info("[" + event.getTo() + "username=" + u.getUsername() + "]");
    messagingTemplate.convertAndSendToUser(u.getUsername(), "/game_event", event);
  }

  public boolean isEventAccepted(GameEvent event) {
    return su.parse(event.getTo()).getPort() == sip.getServerPort();
  }
}
