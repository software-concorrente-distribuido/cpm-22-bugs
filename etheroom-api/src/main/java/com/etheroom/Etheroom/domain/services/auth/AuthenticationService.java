package com.etheroom.Etheroom.domain.services.auth;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.services.auth.aggregates.JwtService;
import com.etheroom.Etheroom.infrastructure.vo.chains.auth.AuthCredentialsValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.UserAuthenticationValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationResponse;
import com.etheroom.Etheroom.presentation.services.auth.IAuthenticationService;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final IUserService userService;

    private final UserAuthenticationValidationChain userAuthenticationValidationChain;

    private final AuthCredentialsValidationChain authCredentialsValidationChain;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        String ethereumAddress = authenticationRequest.getEthereumAddress();
        String ethereumPublicKey = authenticationRequest.getEthereumPublicKey();
        User user = Optional.ofNullable(this.userService.loadUserByUsername(ethereumAddress))
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setAddressToMatch(ethereumAddress);
        user.setKeyToMatch(ethereumPublicKey);
        userAuthenticationValidationChain.performValidations(user);
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        ethereumAddress,
                        ethereumPublicKey
                )
        );
        return new AuthenticationResponse(
                this.jwtService.generateToken(user)
        );
    }

    @Override
    public void validate(AuthenticationRequest authenticationRequest) {
        this.authCredentialsValidationChain.performValidations(authenticationRequest);
    }

}
