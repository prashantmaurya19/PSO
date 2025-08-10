package com.PlayChess.com.UserServices.Filters;

import com.PlayChess.com.UserServices.FeignRepo.AuthService;
import com.PlayChess.com.UserServices.Pojo.AuthUserDetails;
import com.PlayChess.com.UserServices.Utils.ClientUserBuilder;
import com.PlayChess.com.UserServices.Utils.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class AuthenticationServiceFilter extends OncePerRequestFilter {

  @Autowired private AuthService as;
  @Autowired private ClientUserBuilder cub;
  @Autowired private CookieUtil cu;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String cookie_str = cu.getAllCookies(request);
    if (cookie_str.equals("")) throw new UsernameNotFoundException("Invalid Request");

    AuthUserDetails ud = as.verifyByCookie(cookie_str);
    if (ud.getUsername().equals("")) throw new UsernameNotFoundException("Invalid User");

    UserDetails userDetails = cub.create(ud.getUsername(), ud.getRoles());
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(auth);
  }
}
