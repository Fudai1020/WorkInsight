package com.workinsight.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.workinsight.backend.entity.ScheduleEntity;
import com.workinsight.backend.interfaces.CalendarEventProjection;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long>{
    public static final String sql 
    = "SELECT"
    + "   tbl.id AS id"
    + "   ,tbl.title AS title"
    + "   ,tbl.kind AS kind"
    + "   ,tbl.`start` AS `start`"
    + "   ,tbl.`end` AS `end`"
    + "   ,tbl.allday AS allday"
    + "   ,tbl.memo AS memo"
    + " FROM ("
    + "       SELECT"
    + "             s.schedule_id AS id"
    + "             ,s.schedule_title AS title"
    + "             ,'normal' AS kind, "
    + "             CASE"
    + "                 WHEN s.is_allday = 0"
    + "                     THEN TIMESTAMP(s.schedule_date,s.schedule_start_time)"
    + "                     ELSE TIMESTAMP(s.schedule_date)"
    + "                 END AS `start`,"
    + "             CASE"
    + "                 WHEN s.is_allday = 0"
    + "                     THEN TIMESTAMP(s.schedule_date,s.schedule_end_time)"
    + "                     ELSE TIMESTAMP(DATE_ADD(s.schedule_date,INTERVAL 1 DAY))"
    + "                 END AS `end`,"    
    + "             s.is_allday AS allday"    
    + "             ,s.schedule_memo AS memo"
    + "        FROM"
    + "             schedules s"
    + "        LEFT JOIN users u"
    + "             ON u.user_id = s.user_id"
    + "        WHERE"
    + "             u.user_email = :userEmail"
    + "        AND s.schedule_date >= :start"
    + "        AND s.schedule_date < :end"
    + "        UNION ALL"
    + "       SELECT"
    + "             ps.period_schedule_id AS id"
    + "             ,ps.period_schedule_title AS title"
    + "             ,'period' AS kind "
    + "             ,TIMESTAMP(ps.start_date) AS `start`"
    + "             ,TIMESTAMP(DATE_ADD(ps.end_date,INTERVAL 1 DAY)) AS `end`"   
    + "             ,1 AS allday"    
    + "             ,ps.schedule_memo AS memo"
    + "        FROM"
    + "             period_schedules ps"
    + "        LEFT JOIN users u"
    + "             ON u.user_id = ps.user_id"
    + "        WHERE"
    + "             u.user_email = :userEmail"
    + "        AND ps.start_date >= :start"
    + "        AND ps.end_date < :end"
    + "     ) tbl"
    + " ORDER BY tbl.`start` ,tbl.`end`";

    List<ScheduleEntity> findByUser_UserEmailAndScheduleDateBetween(String userEmail,LocalDate start,LocalDate end);

    @Query(value = sql,nativeQuery = true)
    List<CalendarEventProjection> findCalendarEventProjections(String userEmail,LocalDate start,LocalDate end);


}
