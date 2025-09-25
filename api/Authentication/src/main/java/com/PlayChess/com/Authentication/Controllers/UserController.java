package com.PlayChess.com.Authentication.Controllers;

import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Pojo.UserPersonalInfomation;
import com.PlayChess.com.Authentication.Response.VerifiedClient;
import com.PlayChess.com.Authentication.Services.UserService;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

  @Autowired private UserService us;

  @GetMapping("/verify")
  public ResponseEntity<VerifiedClient> verify() {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    return new ResponseEntity<VerifiedClient>(
        new VerifiedClient(au.getName(), HttpStatus.OK.value()),
        au.getName().equals("anonymousUser") ? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<User> getUser() {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    User d = this.us.getUserByUsername(au.getName());
    // this is only for devlopment
    if (d == null)
      d =
          new User(
              Long.valueOf(0),
              "Fuser",
              "Luser",
              au.getName(),
              au.getName(),
              "jingalala",
              List.of("USER"),
              new UserPersonalInfomation(Long.valueOf(1), 1000));
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }

  @PutMapping
  public ResponseEntity<User> updateUserCredential(@RequestBody User newu) {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    User d = this.us.updateUserCredentials(newu, au.getName());
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }

  @DeleteMapping
  public ResponseEntity<User> deleteUser() {
    Authentication au = SecurityContextHolder.getContext().getAuthentication();
    User d = this.us.deleteById(au.getName());
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }

  @GetMapping("/get_info/{username}")
  public ResponseEntity<User> getUserInfo(@PathVariable String username) {
    User d = this.us.getUserByUsername(username);
    // this is only for devlopment
    if (d == null)
      d =
          new User(
              Long.valueOf(0),
              "Fuser",
              "Luser",
              username,
              username,
              "jingalala",
              List.of("USER"),
              new UserPersonalInfomation(Long.valueOf(1), 1000));
    d.hideSensitiveInfo();
    return new ResponseEntity<User>(d, d == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
  }
}
