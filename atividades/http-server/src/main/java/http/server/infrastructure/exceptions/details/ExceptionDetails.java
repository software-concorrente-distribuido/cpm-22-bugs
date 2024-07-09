package http.server.infrastructure.exceptions.details;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class ExceptionDetails {

    private String title;

    private int status;

    private String details;

    private String developerMessage;

    private String className;

    private Date timestamp;

}