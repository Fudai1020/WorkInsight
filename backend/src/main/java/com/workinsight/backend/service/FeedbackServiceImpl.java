package com.workinsight.backend.service;

import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.FeedbackRequest;
import com.workinsight.backend.dto.FeedbackResponse;
import com.workinsight.backend.entity.FeedbackEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.FeedbackRepository;
import com.workinsight.backend.repository.UserRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository,UserRepository userRepository){
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }
    @Override
    public FeedbackResponse createFeedback(String userEmail,FeedbackRequest request){
        UserEntity user = userRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new UserNotFoundException("ユーザが見当たりません"));
        if(request.getWorkHour() < 0 || request.getWorkHour() > 24){
            throw new IllegalArgumentException("適切な時間を入力してください");
        }
        if(request.getWorkMinutes() < 0 || request.getWorkMinutes() > 59 ){
            throw new IllegalArgumentException("適切な時間を入力してください");
        }
        boolean wasSabori = (request.getFeedbackContent() == null || request.getFeedbackContent().isBlank());
        FeedbackEntity feedback = FeedbackEntity.builder()
                        .workHour(request.getWorkHour())
                        .workMinutes(request.getWorkMinutes())
                        .feedbackContent(request.getFeedbackContent())
                        .wasSabori(wasSabori)
                        .user(user)
                        .build();
        FeedbackEntity saved = feedbackRepository.save(feedback);
        return FeedbackResponse.builder()
                .feedbackId(saved.getFeedbackId())
                .workHour(saved.getWorkHour())
                .workMinutes(saved.getWorkMinutes())
                .feedbackContent(saved.getFeedbackContent())
                .wasSabori(saved.getWasSabori())
                .build();
    }
}
