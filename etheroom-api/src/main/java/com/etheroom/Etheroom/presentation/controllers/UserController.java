package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/role/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public String findRoleByUserId(String userId) {
        return userService.findRoleByUserId(userId);
    }

}
