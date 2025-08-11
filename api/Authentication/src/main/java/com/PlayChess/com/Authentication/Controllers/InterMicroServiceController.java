package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Response.VerifiedClient;
import com.PlayChess.com.Authentication.Services.UserService;
import com.PlayChess.com.Authentication.Utils.CookiesUtil;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.rmi.ServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InterMicroServiceController {
  @Autowired private CookiesUtil cu;

  @Autowired private UserService us;
  @Autowired private JwtUtil ju;

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
