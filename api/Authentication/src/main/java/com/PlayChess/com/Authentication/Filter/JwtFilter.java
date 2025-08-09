package com.PlayChess.com.Authentication.Filter;

import com.PlayChess.com.Authentication.Utils.CookiesUtil;
import com.PlayChess.com.Authentication.Utils.JwtUtil;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
  @Autowired private UserDetailsService userDetailsService;

  @Autowired private JwtUtil jwtUtil;
  @Autowired private CookiesUtil cu;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String jwt = null, username = null;
    try {
      jwt = cu.extractJwtCookies(request);
      username = jwtUtil.extractUsername(jwt);
    } catch (Exception e) {
      chain.doFilter(request, response);
      return;
    }

    if (username == null) {
      log.info("user not found");
      throw new UsernameNotFoundException("");
    }
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    if (jwtUtil.validateToken(jwt)) {
      UsernamePasswordAuthenticationToken auth =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    chain.doFilter(request, response);
  }
}
