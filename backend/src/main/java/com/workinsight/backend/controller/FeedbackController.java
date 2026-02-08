package com.workinsight.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.FeedbackRequest;
import com.workinsight.backend.dto.FeedbackResponse;
import com.workinsight.backend.service.FeedbackService;

import jakarta.validation.Valid;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
    private final FeedbackService feedbackService;
    public FeedbackController(FeedbackService feedbackService){
        this.feedbackService = feedbackService;
    }
    @PostMapping
    public ResponseEntity<FeedbackResponse> createFeedback(Principal principal,@RequestBody @Valid FeedbackRequest request) {
        FeedbackResponse response = feedbackService.createFeedback(principal.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
}
