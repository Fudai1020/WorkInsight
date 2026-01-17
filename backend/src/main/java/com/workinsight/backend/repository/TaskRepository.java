package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity,Long>{
    
}
