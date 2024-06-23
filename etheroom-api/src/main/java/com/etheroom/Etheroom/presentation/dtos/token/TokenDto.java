package com.etheroom.Etheroom.presentation.dtos.token;

import com.etheroom.Etheroom.domain.models.token.Token;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.TokenType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenDto extends BaseEntityDto<Token> {

    private String token;

    private String hash;

    private TokenType type;

    @Override
    public Token mapDtoToEntity() {
        Token token = new Token();
        token.setToken(this.token);
        token.setHash(this.hash);
        token.setType(this.type);
        token.setCreatedAt(this.getCreatedAt());
        return token;
    }
}
