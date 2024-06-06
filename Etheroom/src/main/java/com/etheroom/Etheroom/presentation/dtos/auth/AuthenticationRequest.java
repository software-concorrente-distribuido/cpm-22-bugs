package com.etheroom.Etheroom.presentation.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest {

    private String login;
    private String password;

}
