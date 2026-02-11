package com.workinsight.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workinsight.backend.dto.SettingRequest;
import com.workinsight.backend.dto.SettingResponse;
import com.workinsight.backend.service.SettingService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/settings")
public class SettingController {
    private final SettingService settingService;

    public SettingController(SettingService settingService){
        this.settingService = settingService;
    }
    @PutMapping
    public ResponseEntity<SettingResponse> setProperties(Principal principal, @RequestBody @Valid SettingRequest request) {
        SettingResponse response = settingService.setProperties(principal.getName(), request);
        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<SettingResponse> getProperties(Principal principal) {
        SettingResponse response = settingService.getProperties(principal.getName());
        return ResponseEntity.ok(response);
    }
    
}
