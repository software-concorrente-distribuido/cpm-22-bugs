package com.etheroom.Etheroom.presentation.services.auth.aggregates;

import com.etheroom.Etheroom.domain.models.user.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.function.Function;

public interface IJwtService {

    String extractLogin(String token);

    Boolean isValid(String token, UserDetails userDetails);

    Boolean isExpired(String token);

    <T> T extractClaim(String token, Function<Claims, T> resolver);

    String generateToken(User user);

}
