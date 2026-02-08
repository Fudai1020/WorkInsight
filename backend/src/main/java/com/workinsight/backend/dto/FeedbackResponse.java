package com.workinsight.backend.dto;

import com.workinsight.backend.entity.FeedbackEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackResponse {
    private Long feedbackId;
    private Integer workHour;
    private Integer workMinutes;
    private String feedbackContent;
    private boolean wasSabori;
    public static FeedbackResponse from(FeedbackEntity entity){
        return FeedbackResponse.builder()
                    .feedbackId(entity.getFeedbackId())
                    .workHour(entity.getWorkHour())
                    .workMinutes(entity.getWorkMinutes())
                    .wasSabori(entity.getWasSabori())
                    .build();
    }
}
