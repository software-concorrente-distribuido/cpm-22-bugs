package http.server.application.controllers;

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
import java.util.Optional;

public class ApplicationController extends HttpServlet {

    private IApplicationService applicationService = ApplicationService.getInstance();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        this.configureCors(resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), "UTF-8"))) {
            this.applicationService.create(JsonUtils.fromJson(reader));
            HttpUtils.setCreatedResponse(resp, "Candidato criado com sucesso");
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
                        id -> this.findById(Integer.parseInt(id), resp),
                        () -> this.findAll(resp)
                );
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        this.configureCors(resp);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), "UTF-8"))) {
            this.applicationService.update(JsonUtils.fromJson(reader));
            HttpUtils.setCreatedResponse(resp, "Candidato atualizado com sucesso");
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
                        id -> this.deleteById(Integer.parseInt(id), resp)
                );
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        this.configureCors(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void findById(Integer id, HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.candidateService.findById(id));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void findAll(HttpServletResponse resp) {
        try {
            HttpUtils.setOkResponse(resp, this.candidateService.findAll());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void deleteById(Integer id, HttpServletResponse resp) {
        try {
            this.candidateService.deleteById(id);
            HttpUtils.setOkResponse(resp, "Candidato deletado com sucesso");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void configureCors(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

}
