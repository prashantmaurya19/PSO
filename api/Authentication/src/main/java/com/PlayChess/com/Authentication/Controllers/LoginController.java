package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Response.AuthResponse;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class LoginController {

  @Autowired private JwtUtil jwt;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> getJwtToken() {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    return new ResponseEntity<AuthResponse>(
        new AuthResponse(jwt.generateToken(au.getName()), "ok"), HttpStatus.OK);
  }
}
