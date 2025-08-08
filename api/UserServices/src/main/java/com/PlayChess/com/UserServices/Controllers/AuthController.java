package com.PlayChess.com.UserServices.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @GetMapping("/test-auth/check-health")
  public String checkSecurity() {
    return "ok";
  }
}
