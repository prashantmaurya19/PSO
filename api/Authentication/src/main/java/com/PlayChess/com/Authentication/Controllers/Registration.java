package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Response.RegistrationResponse;
import com.PlayChess.com.Authentication.Response.VerifiedClient;
import com.PlayChess.com.Authentication.Services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Registration {

  @Autowired
  private UserService us;

  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<RegistrationResponse> createUser(@RequestBody User msg) {
    this.us.create(msg);
    return new ResponseEntity<>(new RegistrationResponse("ok"), HttpStatus.OK);
  }
}
