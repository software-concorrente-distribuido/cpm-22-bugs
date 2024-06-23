package com.etheroom.Etheroom.infrastructure.vo.chains.user.validations;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.chains.Validation;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import org.springframework.stereotype.Component;

import java.util.Optional;

public class UserAttributesValidations extends Validation<User> {

    private static final String EMPTY_ETHEREUM_ADDRESS = "Endereço Ethereum não enviado";

    private static final String EMPTY_ETHEREUM_PUBLIC_KEY = "Chave pública Ethereum não enviado";

    private static final String EMPTY_USER_ROLE = "Perfil de usuário não enviado";

    public void validate(User entityToValidate) {
        Functions.acceptTrueThrows(
                Optional.ofNullable(entityToValidate.getEthereumAddress()).isEmpty(),
                () -> new BadRequestException(EMPTY_ETHEREUM_ADDRESS)
        );
        Functions.acceptTrueThrows(
                Optional.ofNullable(entityToValidate.getEthereumPublicKey()).isEmpty(),
                () -> new BadRequestException(EMPTY_ETHEREUM_PUBLIC_KEY)
        );
        Functions.acceptTrueThrows(
                Optional.ofNullable(entityToValidate.getRole()).isEmpty(),
                () -> new BadRequestException(EMPTY_USER_ROLE)
        );
    }
}
