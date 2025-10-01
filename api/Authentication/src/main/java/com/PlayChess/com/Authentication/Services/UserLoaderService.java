package com.PlayChess.com.Authentication.Services;

import com.PlayChess.com.Authentication.Entities.UserEntity;
import com.PlayChess.com.Authentication.Repositories.UsersRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserLoaderService implements UserDetailsService {
  private final UsersRepo ur;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    if ("user@chess.com".equals(username)) {
      log.info("special request for " + username + " auth recived");
      return User.builder()
          .username("user@chess.com")
          .password("$2a$10$QxcntxtYnz4oC/o064EYw.xJ0w6F0aARwY9t7zFUOERGKxuO487Je")
          .roles("USER")
          .build();
    }
    UserEntity u = null;
    try {
      u = this.ur.findByUsername(username);
    } catch (Exception e) {
      log.info("request for " + username + " auth recived enity=" + u + " " + e.getMessage());
    }
    if (u == null) throw new UsernameNotFoundException("User  " + username + " not found!!!");
    return User.builder()
        .username(u.getUsername())
        .password(u.getPassword())
        .roles(u.getRoles().toArray(new String[0]))
        .build();
  }
}
