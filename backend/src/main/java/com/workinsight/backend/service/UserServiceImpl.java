package com.workinsight.backend.service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.workinsight.backend.dto.UserCreateCommand;
import com.workinsight.backend.dto.UserLoginRequest;
import com.workinsight.backend.dto.UserLoginResponse;
import com.workinsight.backend.dto.UserResponse;
import com.workinsight.backend.dto.UserUpdateRequest;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.InvalidPasswordException;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public UserResponse register(UserCreateCommand request){
        if(userRepository.existsByUserEmail(request.getUserEmail())){
            throw new IllegalArgumentException("このメールアドレスはすでに登録済みです");
        }
        UserEntity user = UserEntity.builder()
            .userEmail(request.getUserEmail())
            .userPassword(passwordEncoder.encode(request.getUserPassword()))
            .isFirstLogin(true)
            .build();

        UserEntity saved = userRepository.save(user);
        return new UserResponse(saved.getUserId(),saved.getUserName(), saved.getUserEmail(),saved.getUserMemo());
    }
    @Override
    public UserLoginResponse login(UserLoginRequest request){
        UserEntity user = userRepository.findByUserEmail(request.getUserEmail())
            .orElseThrow(() -> new UserNotFoundException("ユーザが見つかりません"));

    if(!passwordEncoder.matches(request.getPassword(), user.getUserPassword())){
        throw new InvalidPasswordException("パスワードが一致しませんでした");
    }
    return UserLoginResponse.builder()
            .userId(user.getUserId())
            .userEmail(user.getUserEmail())
            .isFirstLogin(user.getIsFirstLogin())
            .build();
    }
    @Override
    public UserResponse updateUser(String email,UserUpdateRequest request){
        UserEntity user  = userRepository.findByUserEmail(email)
            .orElseThrow(() -> new UserNotFoundException("存在しないユーザです"));
        if(request.getUserName() != null) user.setUserName(request.getUserName());
        if(request.getUserEmail() != null) user.setUserEmail(request.getUserEmail());
        if(request.getUserMemo() != null) user.setUserMemo(request.getUserMemo());
        UserEntity saved = userRepository.save(user);
        return UserResponse.builder()
                .userId(saved.getUserId())
                .userName(saved.getUserName())
                .userEmail(saved.getUserEmail())
                .userMemo(saved.getUserMemo())
                .build();
    }
}
