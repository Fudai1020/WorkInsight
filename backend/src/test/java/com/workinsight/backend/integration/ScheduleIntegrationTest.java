package com.workinsight.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

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
public class ScheduleIntegrationTest extends UserIntegrationTest{
    @Autowired
    private MockMvc mockMvc;

    private String email = "test@example.com";
    private String password = "password";
    @Test
    void スケジュールが登録できる() throws Exception{
        registerUser(email, password);
        String token = loginAndGetToken(email, password);
        mockMvc.perform(
            post("/api/schedules")
                .header("Authorization", "Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "scheduleTitle":"スケジュール",
                            "scheduleDate":"2026-01-30",
                            "startTime":"10:00:00",
                            "endTime":"13:00:00",
                            "allday":false,
                            "scheduleMemo":"メモ"
                        }
                        """)   
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.scheduleId").exists())
        .andExpect(jsonPath("$.scheduleTitle").value("スケジュール"))
        .andExpect(jsonPath("$.scheduleDate").value("2026-01-30"))
        .andExpect(jsonPath("$.startTime").value("10:00:00"))
        .andExpect(jsonPath("$.endTime").value("13:00:00"))
        .andExpect(jsonPath("$.allday").value(false))
        .andExpect(jsonPath("$.scheduleMemo").value("メモ"));
    }
    @Test
    void スケジュールを取得できる() throws Exception{
        registerUser(email, password);
        String token = loginAndGetToken(email, password);
        createSchedule(token, "今日の予定", LocalDate.now());
        createSchedule(token, "明日の予定", LocalDate.now().plusDays(1));
        mockMvc.perform(
            get("/api/schedules")
                .param("range","TODAY")
                .header("Authorization", "Bearer "+token)
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].scheduleTitle").value("今日の予定"));
    }
    protected void createSchedule(String token,String title,LocalDate date) throws Exception{
        mockMvc.perform(
            post("/api/schedules")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "scheduleTitle":"%s",
                            "scheduleDate":"%s",
                            "allday":true
                        }
                        """.formatted(title,date)) 
        ).andExpect(status().isCreated());
    }
}
