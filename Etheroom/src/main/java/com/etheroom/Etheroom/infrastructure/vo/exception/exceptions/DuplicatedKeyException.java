package com.etheroom.Etheroom.infrastructure.vo.exception.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicatedKeyException extends RuntimeException {

    public static final String EXCEPTION_DEVELOPER_MESSAGE = "Exception when there is already a record with the same key in the database";

    public DuplicatedKeyException(String message) {
        super(message);
    }

}
