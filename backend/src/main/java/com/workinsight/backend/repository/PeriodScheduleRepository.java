package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.PeriodScheduleEntity;

public interface PeriodScheduleRepository extends JpaRepository<PeriodScheduleEntity,Long> {
    
}
