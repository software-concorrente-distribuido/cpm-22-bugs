package com.etheroom.Etheroom.presentation.dtos.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetDto {

    private String hash;

    private String email;

    private String newPassword;

}
