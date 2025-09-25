package com.PlayChess.com.Authentication.Entities;

import com.PlayChess.com.Authentication.TransLayer.UserAndUserEntityLayer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity implements UserAndUserEntityLayer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "uid")
  private Long id;

  private String firstname;
  private String lastname;
  private String email;
  private String password;

  private String username;

  @OneToOne @MapsId private UserPersonalInfomationEntity info;

  private List<String> roles;

  public boolean isUserHavePassword() {
    return !(this.getPassword() == null || this.getPassword().equals(""));
  }

  public boolean isUserHaveUsername() {
    return !(this.getUsername() == null || this.getUsername().equals(""));
  }

  public boolean isUserHaveFirstName() {
    return !(this.getFirstname() == null || this.getFirstname().equals(""));
  }

  public boolean isUserHaveLastName() {
    return !(this.getLastname() == null || this.getLastname().equals(""));
  }

  public boolean isUserHaveEmail() {
    return !(this.getEmail() == null || this.getEmail().equals(""));
  }
}
