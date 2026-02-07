package com.workinsight.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.workinsight.backend.entity.ScheduleEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleResponse {
    private Long scheduleId;
    private String scheduleTitle;
    private LocalDate scheduleDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean allday;
    private String scheduleMemo;
    public static ScheduleResponse from(ScheduleEntity entity){
        return ScheduleResponse.builder()
                .scheduleId(entity.getScheduleId())
                .scheduleTitle(entity.getScheduleTitle())
                .scheduleDate(entity.getScheduleDate())
                .startTime(entity.getScheduleStarttime())
                .endTime(entity.getScheduleEndtime())
                .allday(entity.getIsAllday())
                .scheduleMemo(entity.getScheduleMemo())
                .build();
    }
}
