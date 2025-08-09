package com.PlayChess.com.Authentication.Exceptions;

import jakarta.servlet.ServletException;

public class CookieNotFound extends ServletException {
  public CookieNotFound(String message) {
    super(message);
  }

  public CookieNotFound(String message, Throwable cause) {
    super(message, cause);
  }
}
