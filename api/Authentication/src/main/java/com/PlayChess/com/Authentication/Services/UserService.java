package com.PlayChess.com.Authentication.Services;

import com.PlayChess.com.Authentication.Entities.UserEntity;
import com.PlayChess.com.Authentication.Pojo.User;
import com.PlayChess.com.Authentication.Pojo.UserInterface;
import com.PlayChess.com.Authentication.Repositories.Users;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final Users ur;

  private final ModelMapper mm;
  private final PasswordEncoder pe;


  public boolean isUserHavePassword(UserInterface u) {
    return !(u.getPassword() == null || u.getPassword().equals(""));
  }

  public boolean isUserHaveFirstName(UserInterface u) {
    return !(u.getFirstname() == null || u.getFirstname().equals(""));
  }

  public boolean isUserHaveLastName(UserInterface u) {
    return !(u.getLastname() == null || u.getLastname().equals(""));
  }

  public boolean isUserHaveUsername(UserInterface u) {
    return !(u.getUsername() == null || u.getUsername().equals(""));
  }

  public boolean isUserHaveEmail(UserInterface u) {
    return !(u.getEmail() == null || u.getEmail().equals(""));
  }

  public boolean isValidRole(User u) {
    if (u.getRoles() == null) return false;
    u.getRoles().removeIf(e -> (!e.equals("USER") && !e.equals("ADMIN")));
    return u.getRoles().size() > 0;
  }

  public boolean isValidUser(UserInterface u) {
    return this.isUserHaveEmail(u) && this.isUserHavePassword(u) && this.isUserHaveUsername(u);
  }

  public UserEntity saveNewUser(UserEntity u) {
    u.setUsername(u.getEmail());
    u.setPassword(this.pe.encode(u.getPassword()));
    this.ur.save(u);
    return u;
  }

  public User getUserByEmail(String email) {
    UserEntity d = this.ur.findByEmail(email);
    if (d == null) return null;
    return this.mm.map(d, User.class);
  }

  public User getUserByUsername(String username) {
    UserEntity d = this.ur.findByUsername(username);
    if (d == null) return null;
    return this.mm.map(d, User.class);
  }

  public List<User> getAll() {
    return this.ur.findAll().stream().map(entity -> this.mm.map(entity, User.class)).toList();
  }

  @Transactional
  public User create(User u) {
    if (!this.isValidUser(u)) return null;
    if (!this.isValidRole(u)) {
      u.setRoles(new ArrayList<>());
      u.getRoles().add("USER");
    }
    this.saveNewUser(this.mm.map(u, UserEntity.class));
    return u;
  }

  @Transactional
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
  public User deleteById(String email) {
    UserEntity u = this.ur.findByEmail(email);
    if (u == null) return null;
    User d = this.mm.map(u, User.class);
    this.ur.deleteById(u.getId());
    return d;
  }
}
