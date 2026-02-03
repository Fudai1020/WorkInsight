package com.workinsight.backend.dto;

import java.time.LocalDate;

import com.workinsight.backend.enums.TaskPriority;
import com.workinsight.backend.enums.TaskStatus;

import lombok.Data;

@Data
public class UpdateTaskRequest {
    private String taskTitle;
    private TaskPriority taskPriority;
    private LocalDate taskDeadline;
    private String taskMemo;
    private TaskStatus taskStatus;
}
