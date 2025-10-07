package com.PlayChess.com.Authentication.Utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class ResponseUtil {
  public static void addCookie(HttpServletResponse response, String key, String value) {
    Cookie userCookie = new Cookie(key, value);

    userCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
    userCookie.setPath("/"); // Available across the entire application
    userCookie.setHttpOnly(true); // Prevent client-side script access
    userCookie.setSecure(true); // Only send over HTTPS

    response.addCookie(userCookie);
  }
}
