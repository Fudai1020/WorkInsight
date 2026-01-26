package com.workinsight.backend.service;

import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.entity.TaskEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.TaskRepository;
import com.workinsight.backend.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    public TaskServiceImpl(TaskRepository taskRepository,UserRepository userRepository){
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    @Override
    public TaskResponse createTask(String userEmail,TaskFormRequest request){
        UserEntity user = userRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new UserNotFoundException("ユーザが見当たりません"));
        TaskEntity task = TaskEntity.builder()
                    .taskTitle(request.getTaskTitle())
                    .taskPriority(request.getTaskPriority())
                    .taskDeadline(request.getTaskDeadline())
                    .taskMemo(request.getTaskMemo())
                    .user(user)
                    .build();
        TaskEntity saved = taskRepository.save(task);
        return TaskResponse.builder()
                    .taskId(saved.getTaskId())
                    .taskTitle(saved.getTaskTitle())
                    .taskPriority(saved.getTaskPriority())
                    .taskDeadline(saved.getTaskDeadline())
                    .taskMemo(saved.getTaskMemo())
                    .build();
    }   
}
