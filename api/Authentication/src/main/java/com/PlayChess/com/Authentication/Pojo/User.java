package com.PlayChess.com.Authentication.Pojo;

import com.PlayChess.com.Authentication.Surrogate.Masks;
import com.PlayChess.com.Authentication.TransLayer.UserAndUserEntityLayer;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserAndUserEntityLayer {
  private Long id;

  @Size(min = 4, max = 10, message = "First name must be between 4 and 10 characters")
  private String firstname;

  @Size(min = 4, max = 10, message = "Last name must be between 4 and 10 characters")
  private String lastname;

  @Email(message = "Invalid email format")
  private String email;

  @Size(min = 4, max = 10, message = "Password must be between 4 and 10 characters")
  private String username;

  @Size(min = 4, max = 10, message = "Password must be between 4 and 10 characters")
  private String password;

  private List<String> roles;
  private UserPersonalInfomation info;

  @Override
  public String toString() {
    // Your custom implementation here
    return "User("
        + this.firstname
        + ", "
        + this.lastname
        + ", "
        + this.password
        + ", "
        + this.email
        + ")";
  }

  public void hideSensitiveInfo() {
    this.setPassword(Masks.STRING_HIDDEN_FIELD);
    this.setEmail(Masks.STRING_HIDDEN_FIELD);
    this.setId(Masks.LONG_HIDDEN_FIELD);
    this.getInfo().setId(Masks.LONG_HIDDEN_FIELD);
    this.setRoles(null);
  }
}
