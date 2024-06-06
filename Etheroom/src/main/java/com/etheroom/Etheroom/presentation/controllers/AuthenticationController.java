package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationResponse;
import com.etheroom.Etheroom.presentation.dtos.auth.PasswordResetDto;
import com.etheroom.Etheroom.presentation.services.auth.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
        return this.authenticationService.authenticate(authenticationRequest);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/password-reset-request")
    public void passwordResetFlow(@RequestBody String email) {
        this.authenticationService.passwordResetFlow(email);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/password-reset")
    public void passwordReset(@RequestBody PasswordResetDto passwordResetDto) {
        this.authenticationService.passwordReset(passwordResetDto);
    }

}
