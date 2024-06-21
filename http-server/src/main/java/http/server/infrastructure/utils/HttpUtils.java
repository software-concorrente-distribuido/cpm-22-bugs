package http.server.infrastructure.utils;

import http.server.application.dtos.ApplicationResponse;
import http.server.infrastructure.exceptions.details.ExceptionDetails;
import org.eclipse.jetty.http.HttpMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

public class HttpUtils {

    public static void handleNewRequest(HttpServletRequest request, HttpServletResponse response) {
        configureResponse(response);
        configureCors(response);
    }

    public static <T> void setCreatedResponse(HttpServletResponse response, T responseBody) throws IOException {
        response.setStatus(HttpServletResponse.SC_CREATED);
        setResponseBody(
                response,
                ApplicationResponse.fromSuccess(
                        HttpServletResponse.SC_CREATED,
                        "Requisição realizada com sucesso",
                        responseBody
                )
        );
    }

    public static <T> void setOkResponse(HttpServletResponse response, T responseBody) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        setResponseBody(
                response,
                ApplicationResponse.fromSuccess(
                        HttpServletResponse.SC_OK,
                        "Requisição realizada com sucesso",
                        responseBody
                )
        );
    }

    public static void setNoContentResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        setResponseBody(
                response,
                ApplicationResponse.fromSuccess(
                        HttpServletResponse.SC_OK,
                        message,
                        null
                )
        );
    }

    public static void setMethodNotAllowedResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        setResponseBody(
                response,
                ApplicationResponse.fromError(
                        HttpServletResponse.SC_METHOD_NOT_ALLOWED,
                        "Método não permitido",
                        null
                )
        );
    }

    public static void setErrorFromExceptionDetails(HttpServletResponse response, ExceptionDetails exceptionDetails) {
        response.setStatus(exceptionDetails.getStatus());
        try {
            setResponseBody(
                    response,
                    exceptionDetails
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void configureResponse(HttpServletResponse response) {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }

    private static void configureCors(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD, TRACE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    private static <T> void setResponseBody(HttpServletResponse response, T responseBody) throws IOException {
        Writer writer = response.getWriter();
        writer.write(JsonUtils.toJson(responseBody));
    }

}
