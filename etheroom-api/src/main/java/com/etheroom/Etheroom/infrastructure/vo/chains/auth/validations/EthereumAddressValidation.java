package com.etheroom.Etheroom.infrastructure.vo.chains.auth.validations;

import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.utils.Utils;
import com.etheroom.Etheroom.infrastructure.vo.chains.Validation;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.presentation.dtos.auth.AuthenticationRequest;

public class EthereumAddressValidation extends Validation<AuthenticationRequest> {

    private static final String INVALID_ETHEREUM_ADDRESS = "Invalid ethereum address";

    @Override
    public void validate(AuthenticationRequest entityToValidate) {
        Functions.acceptFalseThrows(
                Utils.isEthereumAddressValid(entityToValidate.getEthereumAddress()),
                () -> new BadRequestException(INVALID_ETHEREUM_ADDRESS)
        );
    }
}
