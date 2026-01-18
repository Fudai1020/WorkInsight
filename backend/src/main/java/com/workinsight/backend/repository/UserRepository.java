package com.workinsight.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long>{

    boolean existsByUserEmail(String userEmail);
    Optional<UserEntity> findByUserEmail(String userEmail);
    
}
