package http.server.application.controllers;

import http.server.application.dtos.ItemResponse;
import http.server.application.services.IApplicationService;
import http.server.domain.services.ApplicationService;
import http.server.infrastructure.exceptions.NotFoundException;
import http.server.infrastructure.exceptions.handler.ExceptionHandler;
import http.server.infrastructure.utils.HttpUtils;
import http.server.infrastructure.utils.JsonUtils;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

public class ApplicationController extends HttpServlet {

    private final IApplicationService applicationService = ApplicationService.getInstance();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpUtils.handleNewRequest(req, resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), StandardCharsets.UTF_8))) {
            ItemResponse itemResponse = this.applicationService.create(JsonUtils.fromJson(reader));
            HttpUtils.setCreatedResponse(
                    resp,
                    itemResponse
            );
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        } catch (NotFoundException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleNotFoundException(e)
            );
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        HttpUtils.handleNewRequest(req, resp);
        Optional.ofNullable(req.getParameter("id"))
                .ifPresentOrElse(
                        id -> this.findById(id, resp),
                        () -> this.findAll(resp)
                );
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpUtils.handleNewRequest(req, resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), StandardCharsets.UTF_8))) {
            this.applicationService.update(
                    req.getParameter("id"),
                    JsonUtils.fromJson(reader)
            );
            HttpUtils.setNoContentResponse(resp, "Item atualizado com sucesso");
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        } catch (NotFoundException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleNotFoundException(e)
            );
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        HttpUtils.handleNewRequest(req, resp);
        this.deleteById(req.getParameter("id"), resp);
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) {
        HttpUtils.handleNewRequest(req, resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doHead(HttpServletRequest req, HttpServletResponse resp) {
        HttpUtils.handleNewRequest(req, resp);
        try {
            HttpUtils.setMethodNotAllowedResponse(resp);
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        }
    }

    @Override
    protected void doTrace(HttpServletRequest req, HttpServletResponse resp) {
        HttpUtils.handleNewRequest(req, resp);
        try {
            HttpUtils.setMethodNotAllowedResponse(resp);
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        }
    }

    private void findById(String id, HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.applicationService.findById(id));
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        } catch (NotFoundException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleNotFoundException(e)
            );
        }
    }

    private void findAll(HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.applicationService.findAll());
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        }
    }

    private void deleteById(String id, HttpServletResponse resp) {
        try {
            this.applicationService.deleteById(id);
            HttpUtils.setNoContentResponse(resp, "Item deletado com sucesso");
        } catch (IOException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleIOException(e)
            );
        } catch (NotFoundException e) {
            HttpUtils.setErrorFromExceptionDetails(
                    resp,
                    ExceptionHandler.handleNotFoundException(e)
            );
        }
    }

}
