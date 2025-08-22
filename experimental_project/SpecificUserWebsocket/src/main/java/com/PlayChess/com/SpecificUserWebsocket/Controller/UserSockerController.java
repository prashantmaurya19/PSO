package com.PlayChess.com.SpecificUserWebsocket.Controller;

import com.PlayChess.com.SpecificUserWebsocket.Pojo.UserMessage;
import com.PlayChess.com.SpecificUserWebsocket.Pojo.UserNotificationMessage;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class UserSockerController {
  @Autowired private SimpMessagingTemplate simpMessagingTemplate;

  @MessageMapping("/secured/room")
  public void sendSpecific(
      @Payload UserMessage msg, Principal user, @Header("simpSessionId") String sessionId)
      throws Exception {
    // OutputMessage out =
    //     new OutputMessage(
    //         msg.getFrom(), msg.getText(), new SimpleDateFormat("HH:mm").format(new Date()));
    simpMessagingTemplate.convertAndSendToUser(
        msg.getRecipientId(),
        "/secured/user/queue/specific-user",
        new UserNotificationMessage(msg.getSenderId(), msg.getRecipientId(), msg.getContent()));
  }
}
