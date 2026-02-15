package com.workinsight.backend.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<String> handlePasswordMismatch(PasswordMismatchException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(e.getMessage());
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message",e.getMessage()));
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserAurgument(UserNotFoundException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message",e.getMessage()));
    }
        @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<?> handleInvalidAurgument(InvalidPasswordException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message",e.getMessage()));
    }
}
