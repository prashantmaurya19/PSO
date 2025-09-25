package com.PlayChess.com.Authentication.Repositories;

import com.PlayChess.com.Authentication.Entities.UserPersonalInfomationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPersonalInfomationsRepo
    extends JpaRepository<UserPersonalInfomationEntity, Long> {}
