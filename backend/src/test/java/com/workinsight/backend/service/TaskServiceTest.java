package com.workinsight.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.entity.TaskEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.enums.TaskPriority;
import com.workinsight.backend.repository.TaskRepository;
import com.workinsight.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    TaskRepository taskRepository;
    @InjectMocks
    TaskServiceImpl taskServiceImpl;
    @Test
    void タスクを保存できる(){
        TaskFormRequest request = TaskFormRequest.builder()
                .taskTitle("タスク")
                .taskPriority(TaskPriority.MEDIUM)
                .taskDeadline(LocalDate.of(2026, 1, 30))
                .taskMemo("メモ")
                .build();
        UserEntity user = UserEntity.builder()
            .userEmail("test@example.com")
            .build();
        when(userRepository.findByUserEmail("test@example.com"))
            .thenReturn(Optional.of(user));
        when(taskRepository.save(any(TaskEntity.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));
        TaskResponse result = taskServiceImpl.createTask("test@example.com", request);
        assertEquals("タスク", result.getTaskTitle());
        assertEquals(TaskPriority.MEDIUM, result.getTaskPriority());
        assertEquals(LocalDate.of(2026, 1, 30), result.getTaskDeadline());
        assertEquals("メモ", result.getTaskMemo());
        
        verify(userRepository).findByUserEmail("test@example.com");
        verify(taskRepository).save(any(TaskEntity.class));
    }
}
