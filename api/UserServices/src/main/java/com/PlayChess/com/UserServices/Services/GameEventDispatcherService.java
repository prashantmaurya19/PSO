package com.PlayChess.com.UserServices.Services;

import com.PlayChess.com.UserServices.Model.GameEvent;
import com.PlayChess.com.UserServices.Pojo.InServerUser;
import com.PlayChess.com.UserServices.Utils.StateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameEventDispatcherService {
  private final StateUtil su;
  private final SimpMessagingTemplate messagingTemplate;
  private final ServerInfoProvider sip;

  public void dispatchToClient(GameEvent event) {
    InServerUser u = su.parse(event.getTo());
    messagingTemplate.convertAndSendToUser(u.getUsername(), "/queue/messages", event);
  }

  public boolean isEventAccepted(GameEvent event) {
    return su.parse(event.getTo()).getPort() == sip.getServerPort();
  }
}
