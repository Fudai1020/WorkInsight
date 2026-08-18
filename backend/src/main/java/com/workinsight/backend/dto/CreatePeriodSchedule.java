package com.workinsight.backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePeriodSchedule {
    private String scheduleTitle;
    private LocalDate startDate;
    private LocalDate endDate;
    private String scheduleMemo;
}
