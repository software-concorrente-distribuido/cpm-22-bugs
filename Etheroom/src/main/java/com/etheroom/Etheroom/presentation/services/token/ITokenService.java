package com.etheroom.Etheroom.presentation.services.token;

import com.etheroom.Etheroom.infrastructure.vo.enums.TokenType;
import com.etheroom.Etheroom.presentation.dtos.token.TokenDto;

public interface ITokenService {

    TokenDto generateToken(TokenType type);

    TokenDto validateToken(String token);

    void concludeToken(String token);

}
