package com.etheroom.Etheroom.infrastructure.configs.security;

import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.presentation.services.auth.aggregates.IJwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtSecurityFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private static final String BEARER_PREFIX = "Bearer ";

    private final IJwtService jwtService;

    private final UserDetailsService userService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);
        Functions.acceptTrue(
                this.isAuthorizationHeaderValid(authorizationHeader),
                () -> this.performFilterFlow(request, authorizationHeader)
        );
        filterChain.doFilter(request, response);
    }

    private void performFilterFlow(HttpServletRequest request,String authorizationHeader) {
        String token = authorizationHeader.replace(BEARER_PREFIX, "");
        UserDetails user = this.userService.loadUserByUsername(this.jwtService.extractLogin(token));
        Functions.acceptTrue(
                this.jwtService.isValid(token, user) && Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication()).isEmpty(),
                () -> {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities()
                    );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
        );
    }

    private Boolean isAuthorizationHeaderValid(String authorizationHeader) {
        return Optional.ofNullable(authorizationHeader)
                .filter(header -> header.startsWith(BEARER_PREFIX))
                .isPresent();
    }

}
