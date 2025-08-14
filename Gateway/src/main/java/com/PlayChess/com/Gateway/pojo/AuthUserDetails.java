package com.PlayChess.com.Gateway.pojo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthUserDetails {
  private int status;
  private String username;
  private List<String> roles;
}
