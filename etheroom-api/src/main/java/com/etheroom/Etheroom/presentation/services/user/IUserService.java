package com.etheroom.Etheroom.presentation.services.user;

import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;

public interface IUserService {

    User loadUserByUsername(String username);

    void handleUserByRole(User user, UserRole userRole);

}
