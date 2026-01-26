package com.workinsight.backend.service;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;

public interface TaskService {
    TaskResponse createTask(String userEmail,TaskFormRequest request);
}
