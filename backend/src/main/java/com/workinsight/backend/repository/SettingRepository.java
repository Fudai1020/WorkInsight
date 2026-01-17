package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.SettingEntity;

public interface SettingRepository extends JpaRepository<SettingEntity,Long>{
}
