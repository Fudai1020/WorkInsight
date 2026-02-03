package com.workinsight.backend.dto;

import java.time.LocalDate;

import com.workinsight.backend.entity.TaskEntity;
import com.workinsight.backend.enums.TaskPriority;
import com.workinsight.backend.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskResponse {
    private Long taskId;
    private String taskTitle;
    private TaskPriority taskPriority;
    private LocalDate taskDeadline;
    private String taskMemo;
    private TaskStatus taskStatus;
    public static TaskResponse from(TaskEntity entity){
        return TaskResponse.builder()
                    .taskId(entity.getTaskId())
                    .taskTitle(entity.getTaskTitle())
                    .taskPriority(entity.getTaskPriority())
                    .taskDeadline(entity.getTaskDeadline())
                    .taskMemo(entity.getTaskMemo())
                    .taskStatus(entity.getTaskStatus())
                    .build();   
    }
}
