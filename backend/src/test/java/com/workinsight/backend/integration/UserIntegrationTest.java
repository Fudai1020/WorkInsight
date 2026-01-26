package com.workinsight.backend.integration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;
import com.workinsight.backend.BackendApplication;

import jakarta.transaction.Transactional;

@SpringBootTest(classes = BackendApplication.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class UserIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    protected void registerUser(String email,String password) throws Exception{
        mockMvc.perform(
            post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "userEmail":"%s",
                            "password":"%s",
                            "confirmPassword":"%s"
                        }
                        """.formatted(email,password,password))
        )
            .andExpect(status().isCreated());
    }
    protected String loginAndGetToken(String email,String password) throws Exception{
        MvcResult result = mockMvc.perform(
            post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "userEmail":"%s",
                            "password":"%s"
                        }
                        """.formatted(email,password)))
            .andExpect(status().isOk())
            .andReturn();
        String response = result.getResponse().getContentAsString();
        return JsonPath.read(response, "$.token");  
    }
}
