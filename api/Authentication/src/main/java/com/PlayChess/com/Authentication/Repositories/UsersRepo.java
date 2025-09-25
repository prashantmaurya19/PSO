package com.PlayChess.com.Authentication.Repositories;

import com.PlayChess.com.Authentication.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<UserEntity, Long> {

  UserEntity findByEmail(String email);
  UserEntity findByUsername(String username);
}
