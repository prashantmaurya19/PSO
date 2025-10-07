package com.PlayChess.com.UserServices.Filters;

import com.PlayChess.com.UserServices.Utils.ClientUserBuilder;
import com.PlayChess.com.constants.PsoAuthHeaders;
import com.PlayChess.com.util.StringUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
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

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String username = request.getHeader(PsoAuthHeaders.X_USER_PSO);
    log.info(StringUtil.join("requested username= ", username));

    if (username == null) {
      log.warn("auth request failed!!!!");
      response.setStatus(HttpStatus.UNAUTHORIZED.value());
      return;
    } else if (username.equals("")) {
      log.info("no auth request");
      // response.setStatus(HttpStatus.UNAUTHORIZED.value());
      chain.doFilter(request, response);
      return;
    }
    log.info("auth request");
    UserDetails userDetails = ClientUserBuilder.create(username, List.of("USER"));
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(auth);
    response.addHeader(PsoAuthHeaders.VERIFIED_USER, username);
    chain.doFilter(request, response);
  }
}
