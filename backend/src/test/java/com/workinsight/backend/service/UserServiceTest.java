package com.workinsight.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.workinsight.backend.dto.UserCreateRequest;
import com.workinsight.backend.dto.UserLoginRequest;
import com.workinsight.backend.dto.UserLoginResponse;
import com.workinsight.backend.dto.UserResponse;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.InvalidPasswordException;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    PasswordEncoder passwordEncoder;
    @InjectMocks
    UserServiceImpl userServiceImpl;

    @Test
    void ユーザが初回登録できる(){
        UserCreateRequest request = UserCreateRequest.builder()
            .userName("test")
            .userEmail("test@example.com")
            .password("password")
            .build();

        when(userRepository.existsByUserEmail(request.getUserEmail()))
            .thenReturn(false);
        when(passwordEncoder.encode("password"))
            .thenReturn("encoded");
        UserEntity savedUser = UserEntity.builder()
            .userId(1L)
            .userName("test")
            .userEmail("test@example.com")
            .build();
        when(userRepository.save(any(UserEntity.class)))
                .thenReturn(savedUser);
        UserResponse response = userServiceImpl.register(request);
        assertEquals(1L, response.getUserId());
        assertEquals("test", response.getUserName());
        assertEquals("test@example.com", response.getUserEmail());
    }
    @Test
    void メール重複でエラーを返す(){
        UserCreateRequest request = UserCreateRequest.builder()
            .userName("test")
            .userEmail("test@example.com")
            .password("password")
            .build();
        when(userRepository.existsByUserEmail(request.getUserEmail()))
            .thenReturn(true);
        assertThrows(IllegalArgumentException.class, ()->userServiceImpl.register(request));
        verify(userRepository,never()).save(any());
    }
    @Test
    void ユーザがログインできる(){
        UserLoginRequest request = new UserLoginRequest("test@example.com", "password");

        UserEntity user = UserEntity.builder()
            .userId(1L)
            .userName("test")
            .userEmail("test@example.com")
            .userPassword("encoded")
            .isFirstLogin(true)
            .build();
        
        when(userRepository.findByUserEmail(request.getUserEmail()))
            .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encoded"))
            .thenReturn(true);
        UserLoginResponse response = userServiceImpl.login(request);
        assertEquals(1L, response.getUserId());
        assertEquals("test", response.getUserName());
        assertEquals(true, response.isFirstLogin());
        verify(userRepository).findByUserEmail("test@example.com");
        verify(passwordEncoder).matches("password", "encoded");
    }
    @Test
    void ユーザが存在しないエラー(){
        UserLoginRequest request = new UserLoginRequest("undefine@example.com","password");
        when(userRepository.findByUserEmail("undefine@example.com"))
            .thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userServiceImpl.login(request));
        verify(userRepository).findByUserEmail("undefine@example.com");
        verify(passwordEncoder,never()).matches(any(), any());
    }
    @Test
    void パスワードが一致しないときエラー発生(){
        UserLoginRequest request = new UserLoginRequest("test@example.com","wrongPassword");
        UserEntity user = UserEntity.builder()
            .userId(1L)
            .userName("test")
            .userEmail("test@example.com")
            .userPassword("encoded")
            .build();
        when(userRepository.findByUserEmail("test@example.com"))
            .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", "encoded"))
            .thenReturn(false);
        assertThrows(InvalidPasswordException.class, ()->userServiceImpl.login(request));
        verify(userRepository).findByUserEmail("test@example.com");
        verify(passwordEncoder).matches("wrongPassword", "encoded");
    }
}
