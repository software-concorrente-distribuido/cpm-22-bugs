package com.etheroom.Etheroom.infrastructure.vo.chains.user.validations;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.chains.Validation;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

public class UserAuthenticationValidation extends Validation<User> {

    private static final String KEYS_DIDNT_MATCH = "Chaves não correspondem";

    private static final String EMPTY_PUBLIC_KEY = "Chave pública não foi enviada";

    @Override
    public void validate(User entityToValidate) {
        Functions.acceptFalseThrows(
                Optional.ofNullable(entityToValidate.getKeyToMatch())
                        .map(key -> new BCryptPasswordEncoder().matches(key, entityToValidate.getEthereumPublicKey()))
                        .orElseThrow(() -> new BadRequestException(EMPTY_PUBLIC_KEY)),
                () -> new BadRequestException(KEYS_DIDNT_MATCH)
        );
    }
}
