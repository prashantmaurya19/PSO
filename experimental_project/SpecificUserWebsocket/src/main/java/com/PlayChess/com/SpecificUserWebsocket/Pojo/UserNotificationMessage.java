package com.PlayChess.com.SpecificUserWebsocket.Pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserNotificationMessage {
  private String senderId;
  private String recipientId;
  private String content;
}
