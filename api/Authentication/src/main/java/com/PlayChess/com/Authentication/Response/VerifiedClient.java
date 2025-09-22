package com.PlayChess.com.Authentication.Response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class VerifiedClient {
  public String username;
  public int status;
}
