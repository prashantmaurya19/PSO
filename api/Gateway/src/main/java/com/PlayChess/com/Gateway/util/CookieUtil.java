package com.PlayChess.com.Gateway.util;

import com.PlayChess.com.Gateway.exceptions.CookieNotFound;
import com.PlayChess.com.constants.PsoCookieNames;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.util.MultiValueMap;

public class CookieUtil {

  public static final String JWT_COOKIE_NAME = PsoCookieNames.JWT_COOKIE_NAME;

  public static String extractJwtCookies(ServerHttpRequest request) throws CookieNotFound {
    MultiValueMap<String, HttpCookie> cookies = request.getCookies();
    HttpCookie cookie = cookies.getFirst(JWT_COOKIE_NAME);
    if (cookie == null) {
      throw new CookieNotFound(JWT_COOKIE_NAME + " not found!!!");
    }
    return cookie.getValue();
  }
}
