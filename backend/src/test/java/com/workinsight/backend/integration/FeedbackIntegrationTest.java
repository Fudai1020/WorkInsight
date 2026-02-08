package com.workinsight.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class FeedbackIntegrationTest extends UserIntegrationTest{
    @Autowired
    private MockMvc mockMvc;
    private String email = "test@example.com";
    private String password = "password";
    @Test
    void フィードバックを送信できる() throws Exception{
        registerUser(email,password);
        String token = loginAndGetToken(email,password);
        mockMvc.perform(
            post("/api/feedbacks")
                .header("Authorization", "Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "workHour":1,
                            "workMinutes":30,
                            "feedbackContent":"内容",
                            "wasSabori":false
                        }
                        """)   
        ).andExpect(status().isCreated())
        .andExpect(jsonPath("$.feedbackId").exists())
        .andExpect(jsonPath("$.workHour").value(1))
        .andExpect(jsonPath("$.workMinutes").value(30))
        .andExpect(jsonPath("$.feedbackContent").value("内容"))
        .andExpect(jsonPath("$.wasSabori").value(false));

    }
}
