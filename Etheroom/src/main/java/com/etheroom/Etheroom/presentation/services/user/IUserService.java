package com.etheroom.Etheroom.presentation.services.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.presentation.dtos.user.UserDto;

public interface IUserService {

    User loadUserByUsername(String username);

}
