package com.PlayChess.com.Authentication.Utils;

import com.PlayChess.com.Authentication.Exceptions.CookieNotFound;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class CookiesUtil {

  private String JWT_COOKIE_NAME = "token_id";

  public Cookie createJwtCookies(String jwt) {
    Cookie cookie = new Cookie(this.JWT_COOKIE_NAME, jwt);
    cookie.setHttpOnly(true); // Set the HttpOnly flag
    cookie.setSecure(false); // Recommended for production (requires HTTPS)
    cookie.setPath("/"); // Set the path where the cookie is valid
    cookie.setMaxAge(60 * 60 * 24 * 7); // Set max age (e.g., 7 days)
    return cookie;
  }

  public String extractJwtCookies(HttpServletRequest request) throws CookieNotFound {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
    }
    Optional<String> cookieValue =
        Arrays.stream(cookies)
            .filter(cookie -> this.JWT_COOKIE_NAME.equals(cookie.getName()))
            .map(Cookie::getValue)
            .findAny();

    if (!cookieValue.isPresent()) {
      throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
    }
    return cookieValue.get();
  }
}
