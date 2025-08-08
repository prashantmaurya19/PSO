package com.PlayChess.com.UserServices.Pojo;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthUserDetails {
  private String status;
  private String username;
  private List<String> roles;
}
