package com.etheroom.Etheroom.domain.services.token;

import com.etheroom.Etheroom.domain.models.token.Token;
import com.etheroom.Etheroom.domain.repositories.token.TokenRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.utils.Utils;
import com.etheroom.Etheroom.infrastructure.vo.enums.TokenType;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.token.TokenDto;
import com.etheroom.Etheroom.presentation.services.token.ITokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TokenService implements ITokenService {

    private static final String TOKEN_NOT_FOUND = "Código inválido";

    private final TokenRepository tokenRepository;

    @Override
    public TokenDto generateToken(TokenType type) {
        Token token = new Token();
        token.setToken(Utils.generateRandomFourDigitsCode());
        token.setHash(Utils.generateRandomHash());
        token.setType(type);
        return this.tokenRepository.save(token).mapEntityToDto();
    }

    @Override
    public TokenDto validateToken(String tokenIdentification) {
        return this.tokenRepository.findByTokenOrHash(tokenIdentification)
                .orElseThrow(() -> new NotFoundException(TOKEN_NOT_FOUND))
                .mapEntityToDto();
    }

    @Override
    @Transactional
    public void concludeToken(String hash) {
        Functions.acceptFalseThrows(
                this.tokenRepository.existsByHash(hash),
                () -> new NotFoundException(TOKEN_NOT_FOUND)
        );
        this.tokenRepository.deleteByHash(hash);
    }

    @Scheduled(cron = "0 0 4 * * 6")
    public void deleteExpiredTokens() {
        this.tokenRepository.deleteAll();
    }

}
