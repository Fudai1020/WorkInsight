package com.workinsight.backend.service;

import com.workinsight.backend.dto.UserCreateCommand;
import com.workinsight.backend.dto.UserLoginRequest;
import com.workinsight.backend.dto.UserLoginResponse;
import com.workinsight.backend.dto.UserResponse;

public interface UserService {
    UserResponse register(UserCreateCommand request);
    UserLoginResponse login(UserLoginRequest loginRequest);
}
