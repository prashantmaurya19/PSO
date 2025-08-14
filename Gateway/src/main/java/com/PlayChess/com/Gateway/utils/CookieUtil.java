package com.PlayChess.com.Gateway.utils;

import com.PlayChess.com.Gateway.exception.CookieNotFound;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

@Component
public class CookieUtil {

  private String JWT_COOKIE_NAME = "token_id";

  // public Cookie createJwtCookies(String jwt) {
  // Cookie cookie = new Cookie(this.JWT_COOKIE_NAME, jwt);
  // cookie.setHttpOnly(true); // Set the HttpOnly flag
  // cookie.setSecure(false); // Recommended for production (requires HTTPS)
  // cookie.setPath("/"); // Set the path where the cookie is valid
  // cookie.setMaxAge(60 * 60 * 24 * 7); // Set max age (e.g., 7 days)
  // return cookie;
  // }

  public String extractJwtCookies(ServerHttpRequest request) throws CookieNotFound {
    MultiValueMap<String, HttpCookie> cookies = request.getCookies();
    HttpCookie cookie = cookies.getFirst(JWT_COOKIE_NAME);
    if (cookie == null) {
      throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
    }
    return cookie.getValue();
  }

  // public String extractJwtCookies(ServerRequest request) throws CookieNotFound
  // {
  // List<String> cookies = request.headers().header("Cookie");
  // if (cookies == null) {
  // throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
  // }
  // String[] temp;
  // for (String cookie : cookies) {
  // temp = cookie.split("=");
  // if (JWT_COOKIE_NAME.equals(temp[0])) {
  // return temp[1];
  // }
  // }
  // throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
  // }

  // public String extractJwtCookies(HttpServletRequest request) throws
  // CookieNotFound {
  // Cookie[] cookies = request.getCookies();
  // if (cookies == null) {
  // throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
  // }
  // Optional<String> cookieValue =
  // Arrays.stream(cookies)
  // .filter(cookie -> this.JWT_COOKIE_NAME.equals(cookie.getName()))
  // .map(Cookie::getValue)
  // .findAny();

  // if (!cookieValue.isPresent()) {
  // throw new CookieNotFound(this.JWT_COOKIE_NAME + " not found!!!");
  // }
  // return cookieValue.get();
  // }
}
