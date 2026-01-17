package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.ScheduleEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long>{
    
}
