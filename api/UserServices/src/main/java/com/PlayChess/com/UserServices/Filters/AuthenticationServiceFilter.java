package com.PlayChess.com.UserServices.Filters;

import com.PlayChess.com.UserServices.FeignRepo.AuthService;
import com.PlayChess.com.UserServices.Pojo.AuthUserDetails;
import com.PlayChess.com.UserServices.Utils.ClientUserBuilder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthenticationServiceFilter extends OncePerRequestFilter {

  @Autowired private AuthService as;
  @Autowired private ClientUserBuilder cub;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String authorizationHeader = request.getHeader("Authorization");
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      throw new UsernameNotFoundException("Invalid User");
    }
    try {
      // find a way to securly throw error when user not found
      // this way error thrown in terminal
      AuthUserDetails ud = as.verify(authorizationHeader.substring(7));
      UserDetails userDetails = cub.create(ud.getUsername(), ud.getRoles());
      UsernamePasswordAuthenticationToken auth =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(auth);
      chain.doFilter(request, response);
    } catch (Exception e) {
      throw new UsernameNotFoundException("Invalid User");
    }
  }
}
