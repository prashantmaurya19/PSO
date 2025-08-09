package com.PlayChess.com.UserServices.Utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

  public String getAllCookies(HttpServletRequest request) {
    StringBuilder cookieValue = new StringBuilder("");
    if (request.getCookies() != null) {
      for (Cookie cookie : request.getCookies()) {
        cookieValue.append(cookie.getName() + "=" + cookie.getValue() + ";");
        // if ("your-cookie-name".equals(cookie.getName())) {
        //   cookieValue = cookie.getValue();
        //   break;
        // }
      }
      cookieValue.deleteCharAt(cookieValue.length() - 1);
    }
    return cookieValue.toString();
  }
}
