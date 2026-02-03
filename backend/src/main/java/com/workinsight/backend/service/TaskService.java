package com.workinsight.backend.service;

import java.util.List;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.dto.UpdateTaskRequest;

public interface TaskService {
    TaskResponse createTask(String userEmail,TaskFormRequest request);
    List<TaskResponse> getTasks(String userEmail,String filter);
    TaskResponse updateTask(Long taskId,String userEmail,UpdateTaskRequest request);
}
