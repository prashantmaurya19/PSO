package com.PlayChess.com.UserServices.Filters;

import com.PlayChess.com.UserServices.Enums.JwtHeaderEnum;
import com.PlayChess.com.UserServices.Utils.ClientUserBuilder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class AuthenticationServiceFilter extends OncePerRequestFilter {

  @Autowired private ClientUserBuilder cub;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String username = request.getHeader(JwtHeaderEnum.X_USER_PSO);

    if (username == null) {
      response.setStatus(HttpStatus.UNAUTHORIZED.value());
      return;
    } else if (username.equals("")) {
      // response.setStatus(HttpStatus.UNAUTHORIZED.value());
      chain.doFilter(request, response);
      return;
    }
    UserDetails userDetails = cub.create(username, List.of("USER"));
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(auth);
    response.addHeader(JwtHeaderEnum.VERIFIED_USER, username);
    chain.doFilter(request, response);
  }
}
