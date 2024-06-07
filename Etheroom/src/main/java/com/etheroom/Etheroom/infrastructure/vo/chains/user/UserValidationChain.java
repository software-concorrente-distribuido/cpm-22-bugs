package com.etheroom.Etheroom.infrastructure.vo.chains.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.vo.chains.ValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.validations.UserAuthenticationValidation;
import org.springframework.stereotype.Component;

@Component
public class UserValidationChain extends ValidationChain<User> {

    public UserValidationChain(UserAuthenticationValidation userAuthenticationValidation) {
        super();
        this.buildValidationChain(
                userAuthenticationValidation
        );
    }

}
