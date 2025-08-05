package com.PlayChess.com.UserServices.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {
  @GetMapping("/check-health")
  public String checkHealth() {
    return "ok";
  }
}
