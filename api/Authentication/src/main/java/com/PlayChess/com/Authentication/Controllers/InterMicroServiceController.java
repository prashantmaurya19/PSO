package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Exceptions.CookieNotFound;
import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Response.VerifiedClient;
import com.PlayChess.com.Authentication.Services.UserService;
import com.PlayChess.com.Authentication.Utils.CookiesUtil;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.rmi.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/old")
public class InterMicroServiceController {
  @Autowired
  private CookiesUtil cu;

  @Autowired
  private UserService us;
  @Autowired
  private JwtUtil ju;

  /** it verifies user with cookies */
  @GetMapping("/verify/v2")
  public ResponseEntity<VerifiedClient> verifyClient(HttpServletRequest request)
      throws ServerException {
    // add caching
    try {
      String username = ju.extractUsername(cu.extractJwtCookies(request));
      User ud = us.getUserByUsername(username);
      return new ResponseEntity<VerifiedClient>(
          new VerifiedClient(ud.getUsername(), HttpStatus.OK.value(), ud.getRoles()), HttpStatus.OK);
    } catch (CookieNotFound e) {
      return new ResponseEntity<>(new VerifiedClient("", HttpStatus.BAD_REQUEST.value(), null), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(new VerifiedClient("", HttpStatus.UNAUTHORIZED.value(), null), HttpStatus.OK);
    }
  }

  @GetMapping("/verify")
  public ResponseEntity<String> verify(HttpServletRequest request) {
    // add caching
    log.info("request recived");
    try {
      String username = ju.extractUsername(cu.extractJwtCookies(request));
      return new ResponseEntity<String>(username, HttpStatus.OK);
    } catch (CookieNotFound e) {
      return new ResponseEntity<>("bad_request", HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<String>("", HttpStatus.OK);
    }
  }
}
