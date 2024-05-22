package com.etheroom.Etheroom.infrastructure.vo.exception;

import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.ServiceException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

@ControllerAdvice
public class EtheroomExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionDetails> handleNotFoundException(NotFoundException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Não Encontrado")
                        .status(HttpStatus.NOT_FOUND.value())
                        .details(exception.getMessage())
                        .developerMessage(NotFoundException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ExceptionDetails> handleUnauthorizedException(UnauthorizedException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Não Autorizado")
                        .status(HttpStatus.UNAUTHORIZED.value())
                        .details(exception.getMessage())
                        .developerMessage(UnauthorizedException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ExceptionDetails> handleServiceException(ServiceException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Erro na Execução do Serviço")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(ServiceException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDetails> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Requisição Inválida")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(
                                exception
                                        .getBindingResult()
                                        .getAllErrors()
                                        .stream()
                                            .map(error -> ((FieldError) error).getField())
                                            .collect(Collectors.joining(", "))
                                            .concat(" é(são) obrigatório(s)")
                        )
                        .developerMessage("Parâmetros inválidos")
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

}

