package com.workinsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.workinsight.backend.entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Long>{
    @Query("""
            SELECT SUM(f.workHour * 60 + f.workMinutes)
            FROM FeedbackEntity f
            WHERE f.user.userEmail = :userEmail
            AND f.wasSabori = false
            """)
    Integer sumWorkMinutes(String userEmail);
    @Query("""
            SELECT SUM(f.workHour * 60 + f.workMinutes)
            FROM FeedbackEntity f
            WHERE f.user.userEmail = :userEmail
            AND f.wasSabori = true
            """)
    Integer sumSaboriMinutes(String userEmail);
}
