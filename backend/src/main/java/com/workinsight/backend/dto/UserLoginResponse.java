package com.workinsight.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserLoginResponse {
    private Long userId;
    private String userEmail;
    private boolean isFirstLogin;
    private String token;
}
