package com.workinsight.backend.service;

import com.workinsight.backend.dto.SettingRequest;
import com.workinsight.backend.dto.SettingResponse;

public interface SettingService {
    SettingResponse setProperties(String email,SettingRequest request);
    SettingResponse getProperties(String email);
}
