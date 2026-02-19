package com.workinsight.backend.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.entity.ScheduleEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.enums.ScheduleRange;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.ScheduleRepository;
import com.workinsight.backend.repository.UserRepository;
@Service
public class ScheduleServiceImpl implements ScheduleService{
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }
    @Override
    public ScheduleResponse createSchedule(String userEmail,ScheduleFormRequest request){
        UserEntity user = userRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new UserNotFoundException("ユーザが見当たりません"));
        LocalTime startTime = null;
        LocalTime endTime = null;
        if(!request.isAllDay()){
            if(request.getStartTime() == null || request.getEndTime() == null){
                throw new IllegalArgumentException("開始・終了時間は必須です");
            }
            if(!request.getStartTime().isBefore(request.getEndTime())){
                throw new IllegalArgumentException("開始時間は終了時間より前である必要があります");
            }
            startTime = request.getStartTime();
            endTime = request.getEndTime();
        }
        ScheduleEntity schedule = ScheduleEntity.builder()
                .scheduleTitle(request.getScheduleTitle())
                .scheduleDate(request.getScheduleDate())
                .scheduleStarttime(startTime)
                .scheduleEndtime(endTime)
                .isAllday(request.isAllDay())
                .scheduleMemo(request.getScheduleMemo())
                .user(user)
                .build();
        ScheduleEntity saved = scheduleRepository.save(schedule);
        return ScheduleResponse.builder()
                .scheduleId(saved.getScheduleId())
                .scheduleTitle(saved.getScheduleTitle())
                .scheduleDate(saved.getScheduleDate())
                .startTime(saved.getScheduleStarttime())
                .endTime(saved.getScheduleEndtime())
                .allday(saved.getIsAllday())
                .scheduleMemo(saved.getScheduleMemo())
                .build();        
    }
    @Override
    public List<ScheduleResponse> getSchedulesByRange(String userEmail,ScheduleRange range){
            LocalDate today = LocalDate.now();
            LocalDate start = null;
            LocalDate end = null;
            switch(range){
                case TODAY -> {
                    start = today;
                    end = today;
                }
                case WEEK -> {
                    start = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
                    end = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
                }
                case MONTH -> {
                    start = today.withDayOfMonth(1);
                    end = today.withDayOfMonth(today.lengthOfMonth());
                }
                default -> throw new IllegalArgumentException("rangeは必須です");
            }
            return scheduleRepository.findByUser_UserEmailAndScheduleDateBetween(userEmail,start,end)
                    .stream()
                    .map(ScheduleResponse::from)
                    .toList();
    }
}
