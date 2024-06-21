package http.server.application.controllers;

import http.server.application.dtos.ItemResponse;
import http.server.application.services.IApplicationService;
import http.server.domain.services.ApplicationService;
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
        this.configureCors(resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), StandardCharsets.UTF_8))) {
            ItemResponse itemResponse = this.applicationService.create(JsonUtils.fromJson(reader));
            HttpUtils.setCreatedResponse(
                    resp,
                    itemResponse
            );
        } catch (IOException e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        this.configureCors(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        Optional.ofNullable(req.getParameter("id"))
                .ifPresentOrElse(
                        id -> this.findById(id, resp),
                        () -> this.findAll(resp)
                );
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        this.configureCors(resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), StandardCharsets.UTF_8))) {
            this.applicationService.update(
                    req.getParameter("id"),
                    JsonUtils.fromJson(reader)
            );
            HttpUtils.setNoContentResponse(resp, "Item atualizado com sucesso");
        } catch (IOException e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        this.configureCors(resp);
        Optional.ofNullable(req.getParameter("id"))
                .ifPresent(
                        id -> this.deleteById(id, resp)
                );
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        this.configureCors(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doHead(HttpServletRequest request, HttpServletResponse response) {
        this.configureCors(response);
        try {
            HttpUtils.setMethodNotAllowedResponse(response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doTrace(HttpServletRequest request, HttpServletResponse response) {
        this.configureCors(response);
        try {
            HttpUtils.setMethodNotAllowedResponse(response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void findById(String id, HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.applicationService.findById(id));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void findAll(HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.applicationService.findAll());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void deleteById(String id, HttpServletResponse resp) {
        try {
            this.applicationService.deleteById(id);
            HttpUtils.setNoContentResponse(resp, "Item deletado com sucesso");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void configureCors(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD, TRACE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

}
