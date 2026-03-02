package com.workinsight.backend.dto;

import com.workinsight.backend.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userMemo;
    public static UserResponse from(UserEntity entity){
        return UserResponse.builder()
                .userId(entity.getUserId())
                .userName(entity.getUserName())
                .userEmail(entity.getUserEmail())
                .userMemo(entity.getUserMemo())
                .build();
    }
}
