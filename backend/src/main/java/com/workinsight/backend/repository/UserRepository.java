package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long>{
    
}
