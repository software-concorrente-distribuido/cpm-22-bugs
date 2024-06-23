package com.etheroom.Etheroom.infrastructure.vo.exception.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public static final String EXCEPTION_DEVELOPER_MESSAGE = "Exception thrown when a bad request is made to the server";
    public BadRequestException(String message){
        super(message);
    }

}
