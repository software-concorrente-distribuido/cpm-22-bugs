package com.etheroom.Etheroom.domain.models.token;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.vo.enums.TokenType;
import com.etheroom.Etheroom.presentation.dtos.token.TokenDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_token")
@Entity
public class Token extends BaseEntity {

    @Column(name = "token")
    private String token;

    @Column(name = "hash")
    private String hash;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TokenType type;

    @Override
    public TokenDto mapEntityToDto() {
        TokenDto tokenDto = new TokenDto();
        tokenDto.setToken(this.token);
        tokenDto.setHash(this.hash);
        tokenDto.setType(this.type);
        return tokenDto;
    }

}
