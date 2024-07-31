package com.etheroom.Etheroom.infrastructure.configs;

import com.etheroom.Etheroom.infrastructure.configs.security.JwtSecurityFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.lang.reflect.Array;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {

    private final JwtSecurityFilter jwtSecurityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(AbstractHttpConfigurer::disable);

        return this.configureHttpRequestAuthorization(http).build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    private HttpSecurity configureHttpRequestAuthorization(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize ->
            authorize
                    .requestMatchers(this.getWhiteListEndpoints())
                    .permitAll()
                    .requestMatchers(HttpMethod.HEAD)
                    .denyAll()
                    .requestMatchers(HttpMethod.TRACE)
                    .denyAll()
                    .requestMatchers(HttpMethod.OPTIONS)
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/hotel")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/person")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/media", "/medias/**")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
        );

        http.addFilterBefore(this.jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class);

        http.logout(
            logout -> logout
                    .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        );

        return http;
    }

    private String[] getWhiteListEndpoints() {
        return new String[] {
            "/oauth/**",
            "/public/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "swagger-resources/**",
            "swagger-config",
            "/v3/api-docs/*",
            "/app/enum/**"
        };
    }

}
