package com.etheroom.Etheroom.infrastructure.vo.chains.auth;

import com.etheroom.Etheroom.infrastructure.vo.chains.ValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.chains.auth.validations.AuthCredentialsValidation;
import com.etheroom.Etheroom.infrastructure.vo.chains.auth.validations.EthereumAddressValidation;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthCredentialsValidationChain extends ValidationChain<AuthenticationRequest> {

    public AuthCredentialsValidationChain() {
        super();
        this.buildValidationChain(
                new AuthCredentialsValidation(),
                new EthereumAddressValidation()
        );
    }

}
