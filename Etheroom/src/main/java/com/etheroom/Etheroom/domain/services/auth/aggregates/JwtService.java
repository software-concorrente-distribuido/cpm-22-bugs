package com.etheroom.Etheroom.domain.services.auth.aggregates;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.presentation.services.auth.aggregates.IJwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService implements IJwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private static final Integer DAY_IN_MILLIS = 86400000;

    @Override
    public String extractLogin(String token) {
        return this.extractClaim(token, Claims::getSubject);
    }

    @Override
    public Boolean isValid(String token, UserDetails userDetails) {
        String login = this.extractLogin(token);
        return login.equals(userDetails.getUsername()) && !this.isExpired(token);
    }

    @Override
    public Boolean isExpired(String token) {
        return this.extractClaim(token, Claims::getExpiration).before(new Date());
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = this.extractAllClaims(token);
        return resolver.apply(claims);
    }

    @Override
    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getAddress())
                .claims(this.getExtraUserClaims(user))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + DAY_IN_MILLIS))
                .signWith(this.getSigningKey())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(this.getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims getExtraUserClaims(User user) {
        return Jwts.claims()
                .add("id", user.getId())
                .add("role", user.getRole().name())
                .build();
    }

}
