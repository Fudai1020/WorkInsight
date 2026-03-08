package com.workinsight.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SummaryResponse {
    private int workMinutes;
    private int saboriMinutes;
    private double saboriRate;
}
