package com.workinsight.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.ScheduleEntity;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long>{
    List<ScheduleEntity> findByUser_UserEmailAndScheduleDateBetween(String userEmail,LocalDate start,LocalDate end);
}
