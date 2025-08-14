package com.PlayChess.com.Gateway.service;

import com.PlayChess.com.Gateway.pojo.AuthUserDetails;
import java.util.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {
  private final RestTemplate restTemplate;
  String url = "http://USER-REGISTRY//auth/verify"; // URL of the service to proxy

  public AuthService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public AuthUserDetails fetchUser(String username, String password) {
    String base64Credentials =
        Base64.getEncoder().encodeToString((username + ":" + password).getBytes());
    HttpHeaders headers = new HttpHeaders();
    headers.add("Authorization", "Basic " + base64Credentials);
    HttpEntity<String> request = new HttpEntity<>(headers);
    return restTemplate.exchange(url, HttpMethod.GET, request, AuthUserDetails.class).getBody();
  }
}
