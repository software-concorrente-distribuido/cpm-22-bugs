package com.etheroom.Etheroom.presentation.services;

import com.etheroom.Etheroom.presentation.dtos.UserDto;

public interface IUserService {

    UserDto create(UserDto userDto);

    UserDto findById(String id);

    void update(UserDto userDto);

    void delete(String id);

}
