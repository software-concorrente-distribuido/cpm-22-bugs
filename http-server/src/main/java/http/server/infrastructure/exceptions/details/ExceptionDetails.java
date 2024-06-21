package http.server.infrastructure.exceptions.details;

import lombok.Builder;

import java.util.Date;

@Builder
public class ExceptionDetails {

    private String title;

    private int status;

    private String details;

    private String developerMessage;

    private String className;

    private Date timestamp;

}