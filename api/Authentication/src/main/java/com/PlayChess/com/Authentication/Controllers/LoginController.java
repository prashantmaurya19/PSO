package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Response.AuthResponse;
import com.PlayChess.com.Authentication.Utils.ResponseUtil;
import com.PlayChess.com.mvc.util.CookieUtil;
import com.PlayChess.com.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class LoginController {

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> getJwtToken(HttpServletResponse response) {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    String token = JwtUtil.generateToken(au.getName());
    ResponseUtil.addCookie(response, CookieUtil.JWT_COOKIE_NAME, token);
    return new ResponseEntity<AuthResponse>(new AuthResponse(token, "ok"), HttpStatus.OK);
  }
}
