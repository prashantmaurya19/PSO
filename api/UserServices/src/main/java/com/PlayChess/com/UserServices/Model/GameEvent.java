package com.PlayChess.com.UserServices.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameEvent {
  private String to;
  private String from;
  private String action;
  private String payload;
}
