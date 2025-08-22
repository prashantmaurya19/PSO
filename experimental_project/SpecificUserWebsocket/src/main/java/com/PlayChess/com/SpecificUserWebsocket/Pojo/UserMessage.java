package com.PlayChess.com.SpecificUserWebsocket.Pojo;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMessage {
  private String chatId;
  private String senderId;
  private String recipientId;
  private String content;
  private Date timestamp;
}
