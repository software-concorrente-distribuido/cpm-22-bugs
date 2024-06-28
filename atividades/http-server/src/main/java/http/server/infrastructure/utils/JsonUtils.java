package http.server.infrastructure.utils;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.GsonBuilder;
import com.nimbusds.jose.shaded.gson.JsonIOException;
import com.nimbusds.jose.shaded.gson.JsonSyntaxException;
import http.server.infrastructure.configs.json.DateDeserializer;

import java.io.BufferedReader;
import java.util.Date;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class JsonUtils {

    private static final Logger LOGGER = Logger.getLogger(JsonUtils.class.getName());

    public static Object fromJson(BufferedReader json) {
        try {
            String jsonInput = json.lines().collect(Collectors.joining(""));
            LOGGER.info("JSON recebido: " + jsonInput);

            Object obj = gsonInstance().fromJson(jsonInput, Object.class);
            LOGGER.info("Objeto desserializado: " + obj);

            return obj;
        } catch (JsonSyntaxException | JsonIOException e) {
            LOGGER.warning("Erro ao desserializar JSON: " + e.getMessage());
            throw new RuntimeException("Erro ao desserializar JSON", e);
        }
    }

    public static <T> String toJson(T object) {
        return gsonInstance().toJson(object);
    }

    private static Gson gsonInstance() {
        return new GsonBuilder()
                .registerTypeAdapter(Date.class, new DateDeserializer())
                .create();
    }

}
