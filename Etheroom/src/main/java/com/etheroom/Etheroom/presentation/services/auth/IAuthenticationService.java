package com.etheroom.Etheroom.presentation.services.auth;

import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationResponse;
import com.etheroom.Etheroom.presentation.dtos.auth.PasswordResetDto;

public interface IAuthenticationService {

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

    void passwordResetFlow(String email);

    void passwordReset(PasswordResetDto passwordResetDto);

}
