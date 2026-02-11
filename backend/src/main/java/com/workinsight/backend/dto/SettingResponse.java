package com.workinsight.backend.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingResponse {
    private Long userId;
    private LocalTime workStartTime;
    private LocalTime workEndTime;
    private LocalTime restStartTime;
    private LocalTime restEndTime;
    private Integer breakMinutes;
    private DayOfWeek settingWeek;
}
