package com.etheroom.Etheroom.infrastructure.configs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.properties.SwaggerUiConfigParameters;
import org.springdoc.core.properties.SwaggerUiConfigProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "JK API",
                description = "JK API",
                version = "0.0.0"
        )
)
public class OpenAPIConfig {

    @Bean
    public GroupedOpenApi authenticatedControllers() {
        return GroupedOpenApi.builder()
                .group("Authenticated Endpoints")
                .packagesToScan("com.jk.presentation.controllers")
                .build();
    }

    @Bean
    public GroupedOpenApi publicControllers() {
        return GroupedOpenApi.builder()
                .group("Public Endpoints")
                .packagesToScan("com.jk.presentation.controllers.publics")
                .build();
    }

    @Bean
    public SwaggerUiConfigParameters swaggerUiConfigParameters() {
        return new SwaggerUiConfigParameters(new SwaggerUiConfigProperties());
    }

}
