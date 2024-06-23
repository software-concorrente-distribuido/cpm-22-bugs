package com.etheroom.Etheroom.infrastructure.vo.chains.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.vo.chains.ValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.validations.UserAttributesValidations;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.validations.UserEthereumCredentialsValidation;
import org.springframework.stereotype.Component;

@Component
public class UserCreationValidationChain extends ValidationChain<User> {

    public UserCreationValidationChain() {
        super();
        this.buildValidationChain(
                new UserAttributesValidations(),
                new UserEthereumCredentialsValidation()
        );
    }

}
