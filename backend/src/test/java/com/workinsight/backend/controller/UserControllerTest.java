package com.workinsight.backend.controller;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.workinsight.backend.dto.UserCreateCommand;
import com.workinsight.backend.dto.UserLoginRequest;
import com.workinsight.backend.dto.UserLoginResponse;
import com.workinsight.backend.dto.UserResponse;
import com.workinsight.backend.exception.GlobalExceptionHandler;
import com.workinsight.backend.service.UserService;


@WebMvcTest(UserController.class)
@Import(GlobalExceptionHandler.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @TestConfiguration
    static class TestConfig{
        @Bean
        UserService userService(){
            return mock(UserService.class);
        }
    }
    @Autowired
    private UserService userService;
    @Test
    void 新規登録リクエストが成功する() throws Exception{
        UserResponse response = new UserResponse(1L, null, "test@example.com");
        when(userService.register(any(UserCreateCommand.class)))
            .thenReturn(response);
        mockMvc.perform(
            post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                    "userEmail":"test@example.com",
                    "password":"password",
                    "confirmPassword":"password"
                    }
                """)   
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.userId").value(1L))
        .andExpect(jsonPath("$.userEmail").value("test@example.com"));
    }
    @Test
    void パスワード確認失敗で400を返す() throws Exception{
        mockMvc.perform(
            post("/api/users/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                "userEmail":"test@example.com",
                "password":"password",
                "confirmPassword":"different"
                }
            """)
        )
        .andExpect(status().isBadRequest());
    }
    @Test
    void ユーザがログイン処理に成功する() throws Exception{
        UserLoginResponse response = UserLoginResponse.builder()
                                        .userId(1L)
                                        .userEmail("test@example.com")
                                        .isFirstLogin(true)
                                        .build();
        when(userService.login(any(UserLoginRequest.class)))
            .thenReturn(response);
        mockMvc.perform(post("/api/users/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                    {
                    "userEmail":"test@example.com",
                    "password":"password"
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(1L))
            .andExpect(jsonPath("$.firstLogin").value(true));

    }
}
