package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Response.AuthResponse;
import com.PlayChess.com.Authentication.Response.VerifiedClient;
import com.PlayChess.com.Authentication.Services.UserService;
import com.PlayChess.com.Authentication.Utils.CookiesUtil;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.rmi.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Registration {

  @Autowired private AuthenticationManager am;
  @Autowired private CookiesUtil cu;

  @Autowired private UserService us;
  @Autowired private JwtUtil ju;

  @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<User> createUser(@RequestBody User msg) {

    User d = this.us.create(msg);
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }

  @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<AuthResponse> login(@RequestBody User msg, HttpServletResponse response) {
    try {

      Authentication au =
          am.authenticate(
              new UsernamePasswordAuthenticationToken(msg.getUsername(), msg.getPassword()));
      String jwt = ju.generateToken(au.getName());
      response.addCookie(cu.createJwtCookies(jwt));
      return new ResponseEntity<AuthResponse>(new AuthResponse(jwt, "ok"), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<AuthResponse>(new AuthResponse("error", "fail"), HttpStatus.OK);
    }
  }

  @GetMapping("/verify/{id}")
  public ResponseEntity<VerifiedClient> verify(@PathVariable String id) {
    // add caching
    String username = ju.extractUsername(id);
    User ud = us.getUserByUsername(username);
    return new ResponseEntity<VerifiedClient>(
        new VerifiedClient(ud.getUsername(), "ok", ud.getRoles()), HttpStatus.OK);
  }

  /** it verifies user with cookies */
  @GetMapping("/verify/v2")
  public ResponseEntity<VerifiedClient> verifyClient(HttpServletRequest request)
      throws ServerException {
    // add caching
    try {
      String username = ju.extractUsername(cu.extractJwtCookies(request));
      User ud = us.getUserByUsername(username);
      return new ResponseEntity<VerifiedClient>(
          new VerifiedClient(ud.getUsername(), "ok", ud.getRoles()), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(new VerifiedClient("", "failed", null), HttpStatus.NOT_FOUND);
    }
  }
}
