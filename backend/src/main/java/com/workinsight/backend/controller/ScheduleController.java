package com.workinsight.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.enums.ScheduleRange;
import com.workinsight.backend.service.ScheduleService;

import jakarta.validation.Valid;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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
    
}
