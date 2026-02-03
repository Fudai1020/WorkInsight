package com.workinsight.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.dto.UpdateTaskRequest;
import com.workinsight.backend.entity.TaskEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.TaskNotFindException;
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
    @Override
    public List<TaskResponse> getTasks(String userEmail,String filter){
        if (("dashboard").equals(filter)) {
            return taskRepository.findTodayOrNoDeadline(userEmail, LocalDate.now(),false)
                    .stream()
                    .map(TaskResponse::from)
                    .toList();
        }
        return taskRepository.findByUser_UserEmail(userEmail)
                .stream()
                .map(TaskResponse::from)
                .toList();
    }
    @Override
    public TaskResponse updateTask(Long taskId,String userEmail,UpdateTaskRequest request){
        TaskEntity task = taskRepository.findById(taskId)
            .orElseThrow(() -> new TaskNotFindException("タスクが存在しません"));
        if(!task.getUser().getUserEmail().equals(userEmail)){
            throw new AccessDeniedException("権限がありません");
        }
        if(request.getTaskTitle() != null)
            task.setTaskTitle(request.getTaskTitle());
        if(request.getTaskPriority() != null)
            task.setTaskPriority(request.getTaskPriority());
        if(request.getTaskDeadline() != null)
            task.setTaskDeadline(request.getTaskDeadline());
        if(request.getTaskMemo() != null)
            task.setTaskMemo(request.getTaskMemo());
        if(request.getTaskStatus() != null)
            task.setTaskStatus(request.getTaskStatus());
        return TaskResponse.from(task);
    } 
}
