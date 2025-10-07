package com.PlayChess.com.mvc.exceptions;

import jakarta.servlet.ServletException;

public class CookieNotFound extends ServletException {
  public CookieNotFound(String message) {
    super(message);
  }

  public CookieNotFound(String message, Throwable cause) {
    super(message, cause);
  }
}
