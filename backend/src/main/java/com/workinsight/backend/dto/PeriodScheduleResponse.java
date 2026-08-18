package com.workinsight.backend.dto;

import java.time.LocalDate;

import com.workinsight.backend.entity.PeriodScheduleEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeriodScheduleResponse {
    private Long periodScheduleId;
    private String periodScheduleTitle;
    private LocalDate startDate;
    private LocalDate endDate;
    private String scheduleMemo;

    public static PeriodScheduleResponse from(PeriodScheduleEntity entity){
        return PeriodScheduleResponse.builder()
                .periodScheduleId(entity.getPeriodScheduleId())
                .periodScheduleTitle(entity.getPeriodScheduleTitle())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .scheduleMemo(entity.getScheduleMemo()) 
                .build();
    }
}
