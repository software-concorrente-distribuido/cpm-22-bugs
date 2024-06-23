package com.etheroom.Etheroom.infrastructure.vo.chains.user.validations;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.utils.Utils;
import com.etheroom.Etheroom.infrastructure.vo.chains.Validation;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;

import java.util.Optional;

public class UserEthereumCredentialsValidation extends Validation<User> {

    private static final String INVALID_ETHEREUM_ADDRESS = "Endereço Ethereum inválido";

    @Override
    public void validate(User entityToValidate) {
        Optional.ofNullable(entityToValidate.getAddressToMatch())
                        .or(() -> Optional.ofNullable(entityToValidate.getEthereumAddress()))
                        .map(Utils::isEthereumAddressValid)
                        .filter(Boolean::booleanValue)
                        .orElseThrow(() -> new BadRequestException(INVALID_ETHEREUM_ADDRESS));
    }

}
