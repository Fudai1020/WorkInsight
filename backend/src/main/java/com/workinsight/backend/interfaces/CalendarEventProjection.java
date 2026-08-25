package com.workinsight.backend.interfaces;


import java.time.LocalDateTime;

public interface CalendarEventProjection {
    
    long getId(); 
    String getTitle();
    String getKind();
    LocalDateTime getStart();
    LocalDateTime getEnd();
    Integer getAllday();
    String getMemo();
    String getColor();
}
