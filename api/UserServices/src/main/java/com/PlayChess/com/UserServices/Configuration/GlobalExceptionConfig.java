package com.PlayChess.com.UserServices.Configuration;

import feign.FeignException;
import jakarta.servlet.ServletException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionConfig {

  @ExceptionHandler(ServletException.class)
  public ResponseEntity<String> handleUserNotFoundException(ServletException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(FeignException.class)
  public ResponseEntity<String> handleFeingException(FeignException ex) {
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  }

  // @ExceptionHandler(CookieNotFound.class)
  // public ResponseEntity<String> handleCookieNotFound(UsernameNotFoundException ex) {
  //   return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
  // }
}
