package com.workinsight.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.workinsight.backend.dto.TaskFormRequest;
import com.workinsight.backend.dto.TaskResponse;
import com.workinsight.backend.enums.TaskPriority;
import com.workinsight.backend.enums.TaskStatus;
import com.workinsight.backend.exception.GlobalExceptionHandler;
import com.workinsight.backend.service.TaskService;

@WebMvcTest(
    controllers = TaskController.class,
    excludeAutoConfiguration = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration.class,
        org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration.class,
        org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientAutoConfiguration.class,
        org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration.class
    },
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ASSIGNABLE_TYPE,
            classes = {
                com.workinsight.backend.security.JwtAuthenticationFilter.class,
                com.workinsight.backend.config.SecurityConfig.class
            }
        )
    }
)
@Import(GlobalExceptionHandler.class)
@AutoConfigureMockMvc(addFilters = false)
public class TaskControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private TaskService taskService;
    @Test
    void タスクフォームの送信が成功する() throws Exception{
        TaskResponse response = new TaskResponse(1L, "タスク", TaskPriority.MEDIUM, LocalDate.of(2026, 1, 30), "メモ",TaskStatus.NONE);
        when(taskService.createTask(anyString(), any(TaskFormRequest.class)))
            .thenReturn(response);
        mockMvc.perform(
            post("/api/tasks")
                .principal(() -> "test@example.com")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "taskTitle":"タスク",
                        "taskPriority":"MEDIUM",
                        "taskDeadline":"2026-01-30",
                        "taskMemo":"メモ"
                    }
                """)
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.taskId").value(1L))
        .andExpect(jsonPath("$.taskTitle").value("タスク"))
        .andExpect(jsonPath("$.taskPriority").value("MEDIUM"))
        .andExpect(jsonPath("$.taskDeadline").value("2026-01-30"))
        .andExpect(jsonPath("$.taskMemo").value("メモ"));
    }
}
