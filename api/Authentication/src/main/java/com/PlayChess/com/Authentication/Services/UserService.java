package com.PlayChess.com.Authentication.Services;

import com.PlayChess.com.Authentication.Entities.UserEntity;
import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Pojo.UserPersonalInfomation;
import com.PlayChess.com.Authentication.Repositories.UsersRepo;
import com.PlayChess.com.Authentication.TransLayer.UserAndUserEntityLayer;
import com.PlayChess.com.util.StringUtil;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  private final UsersRepo ur;
  private final String CACHE_USER = "auth_user";

  private final ModelMapper mm;
  private final PasswordEncoder pe;

  public boolean isUserHavePassword(UserAndUserEntityLayer u) {
    return !(u.getPassword() == null || u.getPassword().equals(""));
  }

  public boolean isUserHaveFirstName(UserAndUserEntityLayer u) {
    return !(u.getFirstname() == null || u.getFirstname().equals(""));
  }

  public boolean isUserHaveLastName(UserAndUserEntityLayer u) {
    return !(u.getLastname() == null || u.getLastname().equals(""));
  }

  public boolean isUserHaveUsername(UserAndUserEntityLayer u) {
    return !(u.getUsername() == null || u.getUsername().equals(""));
  }

  public boolean isUserHaveEmail(UserAndUserEntityLayer u) {
    return !(u.getEmail() == null || u.getEmail().equals(""));
  }

  public boolean isValidRole(User u) {
    if (u.getRoles() == null) return false;
    u.getRoles().removeIf(e -> (!e.equals("USER") && !e.equals("ADMIN")));
    return u.getRoles().size() > 0;
  }

  public boolean isValidUser(UserAndUserEntityLayer u) {
    return this.isUserHaveEmail(u) && this.isUserHavePassword(u) && this.isUserHaveUsername(u);
  }

  public UserEntity saveNewUser(UserEntity u) {
    u.setUsername(u.getEmail());
    u.setPassword(this.pe.encode(u.getPassword()));
    this.ur.save(u);
    return u;
  }

  @Cacheable(cacheNames = CACHE_USER, key = "#email")
  public User getUserByEmail(String email) {
    UserEntity d = this.ur.findByEmail(email);
    if (d == null) return null;
    return this.mm.map(d, User.class);
  }

  @Cacheable(cacheNames = CACHE_USER, key = "#username")
  public User getUserByUsername(String username) {
    UserEntity d = this.ur.findByUsername(username);
    if (d == null) return null;
    return this.mm.map(d, User.class);
  }

  @Cacheable(cacheNames = CACHE_USER, key = "#username")
  public boolean isUserExists(String username) {
    UserEntity d = this.ur.findByUsername(username);
    return d != null;
  }

  public List<User> getAll() {
    return this.ur.findAll().stream().map(entity -> this.mm.map(entity, User.class)).toList();
  }

  @Transactional
  @Cacheable(cacheNames = CACHE_USER, key = "#u.username")
  public User create(User u) {
    if (this.isUserExists(u.getUsername())) return u;
    log.info(StringUtil.join("create user : ", u.getUsername()));
    if (!this.isValidUser(u)) return u;
    return this.createUser(u);
  }

  @CachePut(cacheNames = CACHE_USER, key = "#result.username")
  public User createUser(User u) {
    if (!this.isValidRole(u)) {
      u.setRoles(new ArrayList<>());
      u.getRoles().add("USER");
    }
    UserPersonalInfomation upi = new UserPersonalInfomation();
    upi.setRating(1000);
    u.setInfo(upi);
    this.saveNewUser(this.mm.map(u, UserEntity.class));
    return u;
  }

  @Transactional
  @CachePut(cacheNames = CACHE_USER, key = "#result.email")
  public User updateUserCredentials(User newu, String email) {
    UserEntity u = this.ur.findByEmail(email);
    if (u == null) return null;
    if (this.isUserHavePassword(newu)) u.setPassword(this.pe.encode(newu.getPassword()));
    if (this.isUserHaveFirstName(newu)) u.setFirstname(newu.getFirstname());
    if (this.isUserHaveLastName(newu)) u.setLastname(newu.getLastname());
    u.setRoles(this.isValidRole(newu) ? newu.getRoles() : u.getRoles());
    this.ur.save(u);
    return this.mm.map(u, User.class);
  }

  @Transactional
  @CacheEvict(cacheNames = CACHE_USER, key = "#email")
  public User deleteById(String email) {
    UserEntity u = this.ur.findByEmail(email);
    if (u == null) return null;
    User d = this.mm.map(u, User.class);
    this.ur.deleteById(u.getId());
    return d;
  }
}
