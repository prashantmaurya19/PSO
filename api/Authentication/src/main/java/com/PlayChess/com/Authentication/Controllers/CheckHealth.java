package com.PlayChess.com.Authentication.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class CheckHealth {

  @GetMapping("/status")
  public ResponseEntity<String> checkHealth() {
    return new ResponseEntity<String>("Ok", HttpStatus.OK);
  }
}
