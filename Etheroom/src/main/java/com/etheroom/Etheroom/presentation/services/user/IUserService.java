package com.etheroom.Etheroom.presentation.services.user;

import com.etheroom.Etheroom.domain.models.user.User;

public interface IUserService {

    User loadUserByUsername(String username);

    void handleUser(User user);

}
