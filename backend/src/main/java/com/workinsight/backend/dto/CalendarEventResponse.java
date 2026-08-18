package com.workinsight.backend.dto;
import java.time.LocalDateTime;

import com.workinsight.backend.interfaces.CalendarEventProjection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarEventResponse{
    private long id;
    private String title;
    private String Kind;
    private LocalDateTime start;
    private LocalDateTime end;
    private boolean isAllDay;
    private String memo;
    public static CalendarEventResponse from(CalendarEventProjection projection){
        return CalendarEventResponse.builder()
                .id(projection.getId())
                .title(projection.getTitle())
                .Kind(projection.getKind())
                .start(projection.getStart())
                .end(projection.getEnd())
                .isAllDay(Integer.valueOf(1).equals(projection.getAllday()))
                .memo(projection.getMemo())
                .build();
    }

}