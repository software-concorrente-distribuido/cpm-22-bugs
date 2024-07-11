package com.etheroom.Etheroom.infrastructure.vo.chains.auth.validations;

import com.etheroom.Etheroom.infrastructure.vo.chains.Validation;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;

import java.util.Optional;

public class AuthCredentialsValidation extends Validation<AuthenticationRequest> {

    private static final String ETHEREUM_ADDRESS_NOT_SENDED = "Ethereum address not sended";

    private static final String ETHEREUM_PUBLIC_KEY_NOT_SENDED = "Ethereum public key not sended";

    @Override
    public void validate(AuthenticationRequest entityToValidate) {
        Optional.ofNullable(entityToValidate)
                .map(AuthenticationRequest::getEthereumAddress)
                .orElseThrow(() -> new NotFoundException(ETHEREUM_ADDRESS_NOT_SENDED));
        Optional.of(entityToValidate)
                .map(AuthenticationRequest::getEthereumPublicKey)
                .orElseThrow(() -> new NotFoundException(ETHEREUM_PUBLIC_KEY_NOT_SENDED));
    }

}
