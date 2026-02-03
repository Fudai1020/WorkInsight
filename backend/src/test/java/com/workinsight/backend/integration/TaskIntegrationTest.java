package com.workinsight.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class TaskIntegrationTest extends UserIntegrationTest{
    @Autowired
    private MockMvc mockMvc;
    @Test
    void ユーザタスクを登録できる() throws Exception{
        String email = "test@example.com";
        String password = "password";
        registerUser(email, password);
        String token = loginAndGetToken(email,password);
        mockMvc.perform(
            post("/api/tasks")
                .header("Authorization", "Bearer " + token)
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
        .andExpect(jsonPath("$.taskId").exists())
        .andExpect(jsonPath("$.taskTitle").value("タスク"))
        .andExpect(jsonPath("$.taskPriority").value("MEDIUM"))
        .andExpect(jsonPath("$.taskDeadline").value("2026-01-30"))
        .andExpect(jsonPath("$.taskMemo").value("メモ"));
    }
    @Test
    void タスクを更新できる()throws Exception{
        String email = "test@example.com";
        String password = "password";
        registerUser(email, password);
        String token = loginAndGetToken(email, password);
        MvcResult createResult =  mockMvc.perform(
            post("/api/tasks")
                .header("Authorization", "Bearer "+token)
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
        .andReturn();
        Number taskId = JsonPath.read(createResult.getResponse().getContentAsString(),"$.taskId");
        Long taskIdLong = taskId.longValue();
        mockMvc.perform(
            put("/api/tasks/"+taskIdLong)
                .header("Authorization","Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "taskTitle":"更新後タスク",
                            "taskPriority":"HIGH",
                            "taskStatus":"DONE"
                        }
                        """)
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.taskTitle").value("更新後タスク"))
        .andExpect(jsonPath("$.taskPriority").value("HIGH"))
        .andExpect(jsonPath("$.taskStatus").value("DONE"));
    }
}
