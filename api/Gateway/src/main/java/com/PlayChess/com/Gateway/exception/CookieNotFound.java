package com.PlayChess.com.Gateway.exception;

public class CookieNotFound extends Exception {
  public CookieNotFound(String message) {
    super(message);
  }

  public CookieNotFound(String message, Throwable cause) {
    super(message, cause);
  }
}
