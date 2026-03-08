package com.workinsight.backend.service;

import com.workinsight.backend.dto.FeedbackRequest;
import com.workinsight.backend.dto.FeedbackResponse;
import com.workinsight.backend.dto.SummaryResponse;

public interface FeedbackService {
    FeedbackResponse createFeedback(String userEmail,FeedbackRequest request);
    SummaryResponse getWorkSummary(String userEmail);
}
