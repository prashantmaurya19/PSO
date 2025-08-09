package com.PlayChess.com.Authentication.Configurations;

import com.PlayChess.com.Authentication.Exceptions.CookieNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionConfig {

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(UsernameNotFoundException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(CookieNotFound.class)
  public ResponseEntity<String> handleCookieNotFound(CookieNotFound ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }
}
