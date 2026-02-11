package com.workinsight.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import jakarta.transaction.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class SettingIntegrationTest extends UserIntegrationTest{
    @Autowired
    private MockMvc mockMvc;

    private String email = "test@sample.com";
    private String password = "password";
    @Test
    void ユーザ設定を送信できる() throws Exception{
        registerUser(email, password);
        String token = loginAndGetToken(email, password);
        mockMvc.perform(
            put("/api/settings")
                .header("Authorization", "Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "workStartTime":"09:00:00",
                            "workEndTime":"18:00:00",
                            "restStartTime":"12:00:00",
                            "restEndTime":"13:00:00",
                            "breakMinutes":60,
                            "settingWeek":"MONDAY"
                        }
                        """)
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.userId").exists())
        .andExpect(jsonPath("$.workStartTime").value("09:00:00"))
        .andExpect(jsonPath("$.workEndTime").value("18:00:00"))
        .andExpect(jsonPath("$.restStartTime").value("12:00:00"))
        .andExpect(jsonPath("$.restEndTime").value("13:00:00"))
        .andExpect(jsonPath("$.breakMinutes").value(60))
        .andExpect(jsonPath("$.settingWeek").value("MONDAY"));
    }
    @Test
    void 設定完了後取得できる() throws Exception{
        registerUser(email, password);
        String token = loginAndGetToken(email, password);
        mockMvc.perform(
            put("/api/settings")
                .header("Authorization", "Bearer "+token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "workStartTime":"09:00:00",
                            "workEndTime":"18:00:00",
                            "restStartTime":"12:00:00",
                            "restEndTime":"13:00:00",
                            "breakMinutes":60,
                            "settingWeek":"MONDAY"
                        }
                        """)
        )
        .andExpect(status().isOk());
        mockMvc.perform(
            get("/api/settings")
                .header("Authorization", "Bearer "+token)   
        )
        .andExpect(status().isOk());
    }
}
