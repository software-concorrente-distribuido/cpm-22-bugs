package com.etheroom.Etheroom.infrastructure.vo.chains.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.vo.chains.ValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.validations.UserAuthenticationValidation;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.validations.UserEthereumCredentialsValidation;
import org.springframework.stereotype.Component;

@Component
public class UserAuthenticationValidationChain extends ValidationChain<User> {

    public UserAuthenticationValidationChain() {
        super();
        this.buildValidationChain(
                new UserEthereumCredentialsValidation(),
                new UserAuthenticationValidation()
        );
    }

}
