package com.workinsight.backend.exception;

public class TaskNotFindException extends RuntimeException{
    public TaskNotFindException(String message){
        super(message);
    }
}
