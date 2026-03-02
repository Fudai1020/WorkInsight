package com.workinsight.backend.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    @JsonFormat(pattern = "HH:mm")
    private LocalTime workStartTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime workEndTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime restStartTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime restEndTime;
    private Integer breakMinutes;
    private List<DayOfWeek> settingWeek;
}
