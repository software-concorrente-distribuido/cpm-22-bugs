package com.etheroom.Etheroom.domain.services;

import com.etheroom.Etheroom.domain.models.User;
import com.etheroom.Etheroom.domain.repositories.UserRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.UserDto;
import com.etheroom.Etheroom.presentation.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService, UserDetailsService {

    private static final String USER_NOT_FOUND = "Usuário não encontrado";

    private final UserRepository userRepository;

    @Override
    public UserDto create(UserDto userDto) {
        Functions.acceptTrueThrows(
                userRepository.existsByAddress(userDto.getAddress()),
                () -> new NotFoundException("Já existe um usuário com esse Endereço Ethereum")
        );
        User user = userDto.mapDtoToEntity();
        return userRepository.save(user).mapEntityToDto();
    }

    @Override
    public UserDto findById(String id) {
        return this.userRepository.findById(UUID.fromString(id))
                .map(User::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
    }

    @Override
    public void update(UserDto userDto) {
        Functions.acceptFalseThrows(
                userRepository.existsById(userDto.getId()),
                () -> new NotFoundException(USER_NOT_FOUND)
        );
        User user = userDto.mapDtoToEntity();
        userRepository.save(user);
    }

    @Override
    public void delete(String id) {
        UUID userId = UUID.fromString(id);
        Functions.acceptFalseThrows(
                userRepository.existsById(userId),
                () -> new NotFoundException(USER_NOT_FOUND)
        );
        userRepository.deleteById(userId);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByAddress(username);
    }
}
