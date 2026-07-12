package com.workinsight.backend.exception;

public class ScheduleNotFindException extends RuntimeException {
    public ScheduleNotFindException(String message){
        super(message);
    }
}
