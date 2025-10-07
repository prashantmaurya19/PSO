package com.PlayChess.com.mvc.util;

import com.PlayChess.com.constants.PsoCookieNames;
import com.PlayChess.com.mvc.exceptions.CookieNotFound;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;

public class CookieUtil {

  public static String JWT_COOKIE_NAME = PsoCookieNames.JWT_COOKIE_NAME;

  public static Cookie createJwtCookies(String jwt) {
    Cookie cookie = new Cookie(JWT_COOKIE_NAME, jwt);
    cookie.setHttpOnly(true); // Set the HttpOnly flag
    cookie.setSecure(false); // Recommended for production (requires HTTPS)
    cookie.setPath("/"); // Set the path where the cookie is valid
    cookie.setMaxAge(60 * 60 * 24 * 7); // Set max age (e.g., 7 days)
    return cookie;
  }

  public String getAllCookies(HttpServletRequest request) {
    StringBuilder cookieValue = new StringBuilder("");
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        cookieValue.append(cookie.getName() + "=" + cookie.getValue() + ";");
      }
      cookieValue.deleteCharAt(cookieValue.length() - 1);
    }
    return cookieValue.toString();
  }

  public static String extractJwtCookies(HttpServletRequest request) throws CookieNotFound {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      throw new CookieNotFound(JWT_COOKIE_NAME + " not found!!!");
    }
    Optional<String> cookieValue =
        Arrays.stream(cookies)
            .filter(cookie -> JWT_COOKIE_NAME.equals(cookie.getName()))
            .map(Cookie::getValue)
            .findAny();

    if (!cookieValue.isPresent()) {
      throw new CookieNotFound(JWT_COOKIE_NAME + " not found!!!");
    }
    return cookieValue.get();
  }
}
