package com.workinsight.backend.dto;

import java.time.LocalDate;

import com.workinsight.backend.enums.TaskPriority;

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
}
