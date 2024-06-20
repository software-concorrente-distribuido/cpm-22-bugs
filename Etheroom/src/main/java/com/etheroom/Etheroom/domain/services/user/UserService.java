package com.etheroom.Etheroom.domain.services.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.repositories.user.UserRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.chains.user.UserCreationValidationChain;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.DuplicatedKeyException;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService, UserDetailsService {

    private static final String USER_ROLE_DIDNT_MATCH = "Recurso inválido para tipo de Usuário %s";

    private static final String ETHEREUM_ADDRESS_ALREADY_EXISTS = "Endereço Ethereum já cadastrado";

    private final UserRepository userRepository;

    private final UserCreationValidationChain userCreationValidationChain;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByEthereumAddress(username);
    }

    @Override
    public void handleUserByRole(User user, UserRole userRole) {
        Functions.acceptFalseThrows(
                userRole.equals(user.getRole()),
                () -> new BadRequestException(
                        String.format(USER_ROLE_DIDNT_MATCH, userRole)
                )
        );
        Functions.acceptTrueThrows(
                Optional.ofNullable(this.userRepository.findByEthereumAddress(user.getEthereumAddress())).isPresent(),
                () -> new DuplicatedKeyException(ETHEREUM_ADDRESS_ALREADY_EXISTS)
        );
        this.userCreationValidationChain.performValidations(user);
        user.setEthereumPublicKey(new BCryptPasswordEncoder().encode(user.getEthereumPublicKey()));
    }

}
