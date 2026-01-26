package com.workinsight.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.UserCreateCommand;
import com.workinsight.backend.dto.UserCreateRequest;
import com.workinsight.backend.dto.UserLoginRequest;
import com.workinsight.backend.dto.UserLoginResponse;
import com.workinsight.backend.dto.UserResponse;
import com.workinsight.backend.exception.PasswordMismatchException;
import com.workinsight.backend.security.JwtTokenProvider;
import com.workinsight.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    public UserController(UserService userService,JwtTokenProvider jwtTokenProvider){
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid UserCreateRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("パスワードが一致していません");
        }
        UserResponse response =  userService.register(new UserCreateCommand(request.getUserEmail(),request.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody @Valid UserLoginRequest request) {
        UserLoginResponse response = userService.login(request);
        String token = jwtTokenProvider.generateToken(request.getUserEmail());
        response.setToken(token);
        return ResponseEntity.ok(response);
    }
    
}
