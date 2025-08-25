package com.PlayChess.com.UserServices.Pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InServerUser {
  private int port;
  private String username;

  String getServerName() {
    return this.getPort() + ":" + this.getUsername();
  }
}
