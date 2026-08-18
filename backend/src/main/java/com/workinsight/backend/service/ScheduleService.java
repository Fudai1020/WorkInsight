package com.workinsight.backend.service;

import java.time.LocalDate;
import java.util.List;

import com.workinsight.backend.dto.CalendarEventResponse;
import com.workinsight.backend.dto.CreatePeriodSchedule;
import com.workinsight.backend.dto.PeriodScheduleResponse;
import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.enums.ScheduleRange;

public interface ScheduleService {
    ScheduleResponse createSchedule(String userEmail,ScheduleFormRequest request);
    List<ScheduleResponse> getSchedulesByRange(String userEmail,ScheduleRange range);
    List<ScheduleResponse> getScheduleByPeriod(String userEmail,LocalDate start,LocalDate end);
    ScheduleResponse updateSchedule(String userEmail,Long id,ScheduleFormRequest request);
    PeriodScheduleResponse createPeriodSchedule(String userEmail,CreatePeriodSchedule request);
    List<CalendarEventResponse> getCalendarByPeriod(String userEmail,LocalDate start,LocalDate end);
    PeriodScheduleResponse updatePeriodSchedule(String userEmail,Long id,CreatePeriodSchedule request);
}
