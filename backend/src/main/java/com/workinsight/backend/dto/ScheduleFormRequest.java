package com.workinsight.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleFormRequest {
    private String scheduleTitle;
    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;  
    private boolean isAllday;
    private String scheduleMemo;
}
