package com.PlayChess.com.UserServices.FeignRepo;

import com.PlayChess.com.UserServices.Pojo.AuthUserDetails;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "http://localhost:8080/", value = "Auth-Service")
public interface AuthService {

  @GetMapping("/auth/verify/{id}")
  AuthUserDetails verify(@PathVariable String id);

  @GetMapping("/auth/verify/v2")
  AuthUserDetails verifyByCookie(@RequestHeader("Cookie") String cookieHeader);
}
