package http.server.infrastructure.exceptions.handler;

import http.server.infrastructure.exceptions.DuplicateKeyException;
import http.server.infrastructure.exceptions.NotFoundException;
import http.server.infrastructure.exceptions.details.ExceptionDetails;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;

public class ExceptionHandler {

    private static final Integer BAD_REQUEST_STATUS = 400;

    private static final Integer SERVER_ERROR_STATUS = 500;

    public static ExceptionDetails handleException(DuplicateKeyException exception) {
        return ExceptionDetails.builder()
                .title("Chave Duplicada")
                .status(BAD_REQUEST_STATUS)
                .details(exception.getMessage())
                .developerMessage(DuplicateKeyException.EXCEPTION_DEVELOPER_MESSAGE)
                .className(
                        Arrays.stream(exception.getStackTrace())
                                .findFirst()
                                .map(StackTraceElement::getClassName)
                                .orElse("No Class Name")
                )
                .timestamp(new Date())
                .build();
    }

    public static ExceptionDetails handleException(ServletException exception) {
        return ExceptionDetails.builder()
                .title("Erro no Servidor")
                .status(SERVER_ERROR_STATUS)
                .details(exception.getMessage())
                .developerMessage("Jetty Server Error")
                .className(
                        Arrays.stream(exception.getStackTrace())
                                .findFirst()
                                .map(StackTraceElement::getClassName)
                                .orElse("No Class Name")
                )
                .timestamp(new Date())
                .build();
    }

    public static ExceptionDetails handleIOException(IOException exception) {
        return ExceptionDetails.builder()
                .title("Erro de I/O")
                .status(SERVER_ERROR_STATUS)
                .details(exception.getMessage())
                .developerMessage("Error while attempting to manipulate Byte Data")
                .className(
                        Arrays.stream(exception.getStackTrace())
                                .findFirst()
                                .map(StackTraceElement::getClassName)
                                .orElse("No Class Name")
                )
                .timestamp(new Date())
                .build();
    }

    public static ExceptionDetails handleNotFoundException(NotFoundException exception) {
        return ExceptionDetails.builder()
                .title("Não encontrado")
                .status(BAD_REQUEST_STATUS)
                .details(exception.getMessage())
                .developerMessage("Exception thrown when a resource or item needed is not found")
                .className(
                        Arrays.stream(exception.getStackTrace())
                                .findFirst()
                                .map(StackTraceElement::getClassName)
                                .orElse("No Class Name")
                )
                .timestamp(new Date())
                .build();
    }

}
