package com.workinsight.backend.service;


import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.stereotype.Service;

import com.workinsight.backend.dto.CalendarEventResponse;
import com.workinsight.backend.dto.CreatePeriodSchedule;
import com.workinsight.backend.dto.PeriodScheduleResponse;
import com.workinsight.backend.dto.ScheduleFormRequest;
import com.workinsight.backend.dto.ScheduleResponse;
import com.workinsight.backend.entity.PeriodScheduleEntity;
import com.workinsight.backend.entity.ScheduleEntity;
import com.workinsight.backend.entity.UserEntity;
import com.workinsight.backend.enums.ScheduleRange;
import com.workinsight.backend.exception.ScheduleNotFindException;
import com.workinsight.backend.exception.UserNotFoundException;
import com.workinsight.backend.repository.PeriodScheduleRepository;
import com.workinsight.backend.repository.ScheduleRepository;
import com.workinsight.backend.repository.UserRepository;
@Service
public class ScheduleServiceImpl implements ScheduleService{
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final PeriodScheduleRepository periodScheduleRepository;
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,UserRepository userRepository,PeriodScheduleRepository periodScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
        this.periodScheduleRepository = periodScheduleRepository;
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
                    end = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
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
    @Override
    public List<ScheduleResponse> getScheduleByPeriod(String userEmail,LocalDate start,LocalDate end){
        return scheduleRepository.findByUser_UserEmailAndScheduleDateBetween(userEmail, start, end)
                .stream()
                .map(ScheduleResponse::from)
                .toList();
    } 
    //カレンダー取得
    @Override
    public List<CalendarEventResponse> getCalendarByPeriod(String userEmail,LocalDate start,LocalDate end){
        return scheduleRepository.findCalendarEventProjections(userEmail, start, end)
                .stream()
                .map(CalendarEventResponse::from)
                .toList();
    }

    @Override
    public ScheduleResponse updateSchedule(String userEmail,Long id,ScheduleFormRequest request){
        
        UserEntity user = userRepository.findByUserEmail(userEmail)
            .orElseThrow(() -> new UserNotFoundException("ユーザが見当たりません"));

        ScheduleEntity schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new ScheduleNotFindException("予定が見つかりません"));

        if(!schedule.getUser().getUserEmail().equals(user.getUserEmail())){
            throw new ScheduleNotFindException("アクセス権限がありません");
        }

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

        schedule.setScheduleTitle(request.getScheduleTitle());
        schedule.setScheduleDate(request.getScheduleDate());
        schedule.setScheduleStarttime(startTime);
        schedule.setScheduleEndtime(endTime);
        schedule.setIsAllday(request.isAllDay());
        schedule.setScheduleMemo(request.getScheduleMemo());

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

    //期間予定の追加処理
    @Override
    public PeriodScheduleResponse createPeriodSchedule(String userEmail,CreatePeriodSchedule request){
        //ユーザ認証
        UserEntity user = userRepository.findByUserEmail(userEmail)
                            .orElseThrow(() -> new UserNotFoundException("ユーザが見つかりません"));

        //開始日、終了日のチェック

        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new IllegalArgumentException("開始日、終了日の入力は必須です");
        }
        if(request.getStartDate().isAfter(request.getEndDate())){
            throw new IllegalArgumentException("開始日は終了日よりも前である必要があります");
        }
        
        //エンティティへの保存処理
        PeriodScheduleEntity periodSchedule = PeriodScheduleEntity.builder()
                                .periodScheduleTitle(request.getScheduleTitle())
                                .startDate(request.getStartDate())
                                .endDate(request.getEndDate())
                                .scheduleMemo(request.getScheduleMemo())
                                .user(user)
                                .build();
        PeriodScheduleEntity saved = periodScheduleRepository.save(periodSchedule);
        //resopnseDTOに置き換えてクライアントに返却
        return PeriodScheduleResponse.builder()
                .periodScheduleId(saved.getPeriodScheduleId())
                .periodScheduleTitle(saved.getPeriodScheduleTitle())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .scheduleMemo(saved.getScheduleMemo())
                .build();
    }
    //期間予定の更新処理
    @Override
    public PeriodScheduleResponse updatePeriodSchedule(String userEmail,Long id,CreatePeriodSchedule request){
        UserEntity user = userRepository.findByUserEmail(userEmail)
                        .orElseThrow(() -> new UserNotFoundException("ユーザが見つかりません"));
        PeriodScheduleEntity schedule = periodScheduleRepository.findById(id)
                            .orElseThrow(()-> new ScheduleNotFindException("予定が見つかりません"));

        if(!schedule.getUser().getUserEmail().equals(user.getUserEmail())){
            throw new IllegalArgumentException("権限がありません");
        }
        //日付チェック
        if(request.getStartDate() == null || request.getEndDate() == null){
            throw new IllegalArgumentException("開始日、終了日は必須入力です");
        }
        if(!request.getEndDate().isAfter(request.getStartDate())){
            throw new IllegalArgumentException("終了日は開始日より後である必要があります");
        }

        schedule.setPeriodScheduleTitle(request.getScheduleTitle());
        schedule.setStartDate(request.getStartDate());
        schedule.setEndDate(request.getEndDate());
        schedule.setScheduleMemo(request.getScheduleMemo());

         PeriodScheduleEntity saved = periodScheduleRepository.save(schedule);
        //resopnseDTOに置き換えてクライアントに返却
        return PeriodScheduleResponse.builder()
                .periodScheduleId(saved.getPeriodScheduleId())
                .periodScheduleTitle(saved.getPeriodScheduleTitle())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .scheduleMemo(saved.getScheduleMemo())
                .build();
    }
}
