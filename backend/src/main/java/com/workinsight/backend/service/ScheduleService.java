package com.workinsight.backend.service;

import java.util.List;

import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.enums.ScheduleRange;

public interface ScheduleService {
    ScheduleResponse createSchedule(String userEmail,ScheduleFormRequest request);
    List<ScheduleResponse> getSchedulesByRange(String userEmail,ScheduleRange range);
}
