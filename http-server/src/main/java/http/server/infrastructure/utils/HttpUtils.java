package http.server.infrastructure.utils;

import http.server.application.dtos.ApplicationResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

public class HttpUtils {

    public static <T> void setCreatedResponse(HttpServletResponse response, T responseBody) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
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
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
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
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
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
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
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

    private static <T> void setResponseBody(HttpServletResponse response, T responseBody) throws IOException {
        Writer writer = response.getWriter();
        writer.write(JsonUtils.toJson(responseBody));
    }

}
