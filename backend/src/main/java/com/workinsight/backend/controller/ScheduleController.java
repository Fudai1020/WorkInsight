package com.workinsight.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.CalendarEventResponse;
import com.workinsight.backend.dto.CreatePeriodSchedule;
import com.workinsight.backend.dto.PeriodScheduleResponse;
import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.enums.ScheduleRange;
import com.workinsight.backend.service.ScheduleService;

import jakarta.validation.Valid;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }
    @PostMapping
    public ResponseEntity<ScheduleResponse> createSchedule(Principal principal,@RequestBody @Valid ScheduleFormRequest request) {
        ScheduleResponse response = scheduleService.createSchedule(principal.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<List<ScheduleResponse>> getSchedules(Principal principal,@RequestParam("range") ScheduleRange range) {
        return ResponseEntity.ok(scheduleService.getSchedulesByRange(principal.getName(), range));
    }
    @GetMapping("/range")
    public ResponseEntity<List<CalendarEventResponse>> getSchedulesByPeriod(Principal principal,@RequestParam LocalDate start,@RequestParam LocalDate end) {
        return ResponseEntity.ok(scheduleService.getCalendarByPeriod(principal.getName(), start, end));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ScheduleResponse> updateSchedule(Principal principal,@PathVariable Long id, @RequestBody @Valid ScheduleFormRequest request) {

        scheduleService.updateSchedule(principal.getName(),id,request);
        
        return ResponseEntity.ok().build();
    }
    @PostMapping("/period")
    public ResponseEntity<PeriodScheduleResponse> createPeriodSchedule(Principal principal,@RequestBody @Valid CreatePeriodSchedule request) {
        
        PeriodScheduleResponse response = scheduleService.createPeriodSchedule(principal.getName(), request);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PutMapping("/period/{id}")
    public ResponseEntity<ScheduleResponse> updatePeriodSchedule(Principal principal,@PathVariable Long id, @RequestBody @Valid CreatePeriodSchedule request) {

        scheduleService.updatePeriodSchedule(principal.getName(),id,request);
        
        return ResponseEntity.ok().build();
    }
}
