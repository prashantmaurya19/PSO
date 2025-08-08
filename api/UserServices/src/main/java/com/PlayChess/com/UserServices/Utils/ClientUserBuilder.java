package com.PlayChess.com.UserServices.Utils;

import java.util.List;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class ClientUserBuilder {
  public UserDetails create(String username, List<String> u) {
    return User.builder().username(username).password("").roles(u.toArray(new String[0])).build();
  }
}
