package com.etheroom.Etheroom.domain.services.auth;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.services.auth.aggregates.JwtService;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationResponse;
import com.etheroom.Etheroom.presentation.dtos.auth.PasswordResetDto;
import com.etheroom.Etheroom.presentation.services.auth.IAuthenticationService;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final IUserService userService;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        String ethereumAddress = authenticationRequest.getEthereumAddress();
        User user = this.userService.loadUserByUsername(ethereumAddress);
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        ethereumAddress,
                        null
                )
        );
        return new AuthenticationResponse(
                this.jwtService.generateToken(user)
        );
    }

    @Override
    public void passwordResetFlow(String email) {
    }

    @Override
    @Transactional
    public void passwordReset(PasswordResetDto passwordResetDto) {
    }

}
