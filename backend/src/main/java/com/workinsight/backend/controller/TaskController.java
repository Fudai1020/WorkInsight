package com.workinsight.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.dto.UpdateTaskRequest;
import com.workinsight.backend.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }
    @PostMapping            
    public ResponseEntity<TaskResponse> createTask(Principal principal,@RequestBody @Valid TaskFormRequest request){
        return ResponseEntity.ok(taskService.createTask(principal.getName(), request));
    }
    @GetMapping
    public List<TaskResponse> getTasks(Principal principal,@RequestParam(required = false) String filter) {
        return taskService.getTasks(principal.getName(),filter);
    }
    @PutMapping("/{taskId}")
    public TaskResponse updateTask(@PathVariable Long taskId,
                                    Principal principal,
                                     @RequestBody UpdateTaskRequest request) {
        return taskService.updateTask(taskId, principal.getName(), request);
    }
    
}
