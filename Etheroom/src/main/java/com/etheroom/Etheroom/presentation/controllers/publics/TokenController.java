package com.etheroom.Etheroom.presentation.controllers.publics;

import com.etheroom.Etheroom.presentation.dtos.token.TokenDto;
import com.etheroom.Etheroom.presentation.services.token.ITokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/token")
@RequiredArgsConstructor
public class TokenController {

    private final ITokenService tokenService;

    @PostMapping("/validate")
    public TokenDto validateToken(@RequestBody String token) {
        return this.tokenService.validateToken(token);
    }

}
