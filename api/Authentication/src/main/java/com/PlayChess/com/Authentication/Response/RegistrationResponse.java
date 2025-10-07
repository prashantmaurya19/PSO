package com.PlayChess.com.Authentication.Response;

import com.PlayChess.com.Authentication.Pojo.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationResponse {
  String status;
  User user;
}
