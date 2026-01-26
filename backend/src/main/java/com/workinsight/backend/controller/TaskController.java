package com.workinsight.backend.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }
    @PostMapping("/createTask")
    public ResponseEntity<TaskResponse> createTask(Principal principal,@RequestBody @Valid TaskFormRequest request){
        return ResponseEntity.ok(taskService.createTask(principal.getName(), request));
    }
}
