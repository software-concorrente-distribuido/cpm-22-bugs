package http.server.application.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ApplicationResponse<T> {

    private Integer status;

    private String message;

    private Boolean error;

    private T data;

    private Date queriedAt;

    public static <T> ApplicationResponse<T> fromSuccess(
        Integer status, String message, T data
    ) {
        ApplicationResponse<T> response = new ApplicationResponse<T>();
        response.status = status;
        response.message = message;
        response.error = Boolean.FALSE;
        response.data = data;
        response.queriedAt = new Date();
        return response;
    }

    public static <T> ApplicationResponse<T> fromError(
        Integer status, String message, T data
    ) {
        ApplicationResponse<T> response = new ApplicationResponse<T>();
        response.status = status;
        response.message = message;
        response.error = Boolean.TRUE;
        response.data = data;
        response.queriedAt = new Date();
        return response;
    }

}
