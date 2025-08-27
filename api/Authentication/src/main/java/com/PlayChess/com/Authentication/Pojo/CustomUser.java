package com.PlayChess.com.Authentication.Pojo;

import java.util.Collection;
// Or use a more specific collection type if needed
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUser implements UserDetails {

  private String username;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public CustomUser(
      String username, String password, Collection<? extends GrantedAuthority> authorities) {
    this.username = username;
    this.password = password;
    this.authorities = authorities;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true; // Implement actual logic if needed
  }

  @Override
  public boolean isAccountNonLocked() {
    return true; // Implement actual logic if needed
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true; // Implement actual logic if needed
  }

  @Override
  public boolean isEnabled() {
    return true; // Implement actual logic if needed
  }
}
