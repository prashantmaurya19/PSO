package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Response.AuthResponse;
import com.PlayChess.com.Authentication.Services.UserLoaderService;
import com.PlayChess.com.Authentication.Services.UserService;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Registration {

  // private static final Logger logger = LoggerFactory.getLogger(Registration.class);
  @Autowired private AuthenticationManager am;

  @Autowired private UserService us;
  @Autowired private UserLoaderService uls;
  @Autowired private JwtUtil ju;

  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<User> createUser(@RequestBody User msg) {

    User d = this.us.create(msg);
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }

  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<AuthResponse> login(@RequestBody User msg) {
    try {
      Authentication au =
          am.authenticate(
              new UsernamePasswordAuthenticationToken(msg.getUsername(), msg.getPassword()));
      return new ResponseEntity<AuthResponse>(
          new AuthResponse(ju.generateToken(au.getName()), "ok"), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<AuthResponse>(new AuthResponse("error", "fail"), HttpStatus.OK);
    }
  }
}
