package com.etheroom.Etheroom.infrastructure.vo.exception.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ServiceException extends RuntimeException {

    public static final String EXCEPTION_DEVELOPER_MESSAGE = "Exception thrown when a service or its procedures fail";

    public ServiceException(String message) {
        super(message);
    }
}
