package com.workinsight.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserLoginResponse {
    private Long userId;
    private String userName;
    private boolean isFirstLogin;
}
