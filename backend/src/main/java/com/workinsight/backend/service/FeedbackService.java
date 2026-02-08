package com.workinsight.backend.service;

import com.workinsight.backend.dto.FeedbackRequest;
import com.workinsight.backend.dto.FeedbackResponse;

public interface FeedbackService {
    FeedbackResponse createFeedback(String userEmail,FeedbackRequest request);
}
