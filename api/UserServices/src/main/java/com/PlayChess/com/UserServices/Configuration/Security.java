package com.PlayChess.com.UserServices.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Security {


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
        request ->
            request
                .requestMatchers("/public/**")
                .permitAll()
                .requestMatchers("/admin/**")
                .hasRole("ADMIN")
                .anyRequest()
                .authenticated());
    http.csrf(AbstractHttpConfigurer::disable);
    // http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    // http.addFilterBefore(jf, UsernamePasswordAuthenticationFilter.class);
    // http.httpBasic(Customizer.withDefaults())

    return http.build();
  }

  // @Autowired
  // public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
  //   auth.userDetailsService(uloaderservice).passwordEncoder(passwordEncoder());
  // }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // @Bean
  // public AuthenticationManager authenticationManager(AuthenticationConfiguration auth)
  //     throws Exception {
  //   return auth.getAuthenticationManager();
  // }
}

