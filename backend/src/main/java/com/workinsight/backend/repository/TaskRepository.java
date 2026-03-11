package com.workinsight.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.workinsight.backend.entity.TaskEntity;
import com.workinsight.backend.enums.TaskStatus;

public interface TaskRepository extends JpaRepository<TaskEntity,Long>{
    List<TaskEntity> findByUser_UserEmail(String userEmail);
    @Query("""
            SELECT t FROM TaskEntity t
            WHERE t.user.userEmail = :email
             AND (t.taskDeadline = :today
             OR t.taskDeadline IS NULL)
             AND (:includeDone = true OR t.taskStatus <> 'DONE')
            """)
    List<TaskEntity> findTodayOrNoDeadline(@Param("email") String email,
                                           @Param("today") LocalDate today,
                                           @Param("includeDone") boolean includeDone);
    List<TaskEntity> findTop5ByUser_UserEmailAndTaskDeadlineGreaterThanEqualAndTaskStatusNotOrderByTaskDeadlineAsc(
        String userEmail,LocalDate taskDeadline,TaskStatus taskStatus);    
}
