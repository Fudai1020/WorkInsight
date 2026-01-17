package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workinsight.backend.entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Long>{
    
}
