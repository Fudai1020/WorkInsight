package com.workinsight.backend.service;

import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.SettingRequest;
import com.workinsight.backend.dto.SettingResponse;
import com.workinsight.backend.entity.SettingEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.SettingRepository;
import com.workinsight.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SettingServiceImpl implements SettingService{
    private final SettingRepository settingRepository;
    private final UserRepository userRepository;
    public SettingServiceImpl(SettingRepository settingRepository,UserRepository userRepository){
        this.settingRepository = settingRepository;
        this.userRepository = userRepository;
    }
    @Override
    public SettingResponse setProperties(String email,SettingRequest request){
        UserEntity user = userRepository.findByUserEmail(email)
            .orElseThrow(() -> new UserNotFoundException("ユーザが見当たりません"));
        if(!request.getWorkStartTime().isBefore(request.getWorkEndTime())){
            throw new IllegalArgumentException("開始時間は終了時間より前である必要があります");
        }
        if(!request.getRestStartTime().isBefore(request.getRestEndTime())){
            throw new IllegalArgumentException("開始時間は終了時間よりも前である必要があります");
        }
        SettingEntity setting = settingRepository.findById(user.getUserId())
            .orElseGet(() -> 
                SettingEntity.builder()
                    .user(user)
                    .build()    
                );
         setting.setWorkStartTime(request.getWorkStartTime());
         setting.setWorkEndTime(request.getWorkEndTime());
         setting.setRestStartTime(request.getRestStartTime());
         setting.setRestEndTime(request.getRestEndTime());
         setting.setBreakMinutes(request.getBreakMinutes());
         setting.setSettingWeek(request.getSettingWeek());  
        SettingEntity saved = settingRepository.save(setting); 
        return SettingResponse.builder()
                .userId(saved.getUserId())
                .workStartTime(saved.getWorkStartTime())
                .workEndTime(saved.getWorkEndTime())
                .restStartTime(saved.getRestStartTime())
                .restEndTime(saved.getRestEndTime())
                .breakMinutes(saved.getBreakMinutes())
                .settingWeek(saved.getSettingWeek())
                .build();
    }
    @Override
    public SettingResponse getProperties(String email){
        UserEntity user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new UserNotFoundException("ユーザが見つかりません"));
        SettingEntity setting = settingRepository.findById(user.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("存在しない設定です"));
        return SettingResponse.builder()
                .userId(setting.getUserId())
                .workStartTime(setting.getWorkStartTime())
                .workEndTime(setting.getWorkEndTime())
                .restStartTime(setting.getRestStartTime())
                .restEndTime(setting.getRestEndTime())
                .breakMinutes(setting.getBreakMinutes())
                .settingWeek(setting.getSettingWeek())
                .build();
    }
}
