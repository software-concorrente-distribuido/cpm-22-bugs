package http.server.infrastructure.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

public class HttpUtils {

    private static final Integer CREATED_STATUS = 201;

    private static final Integer OK_STATUS = 200;

    public static <T> void setCreatedResponse(HttpServletResponse response, T responseBody) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(CREATED_STATUS);
        setResponseBody(response, responseBody);
    }

    public static <T> void setOkResponse(HttpServletResponse response, T responseBody) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(OK_STATUS);
        setResponseBody(response, responseBody);
    }

    private static <T> void setResponseBody(HttpServletResponse response, T responseBody) throws IOException {
        Writer writer = response.getWriter();
        writer.write(JsonUtils.toJson(responseBody));
    }

}
