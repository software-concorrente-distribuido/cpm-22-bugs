package com.etheroom.Etheroom.domain.repositories.token;

import com.etheroom.Etheroom.domain.models.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {

    Boolean existsByHash(String hash);

    @Query("SELECT t FROM Token t WHERE t.token = :tokenIdentification OR t.hash = :tokenIdentification")
    Optional<Token> findByTokenOrHash(
            @Param("tokenIdentification") String tokenIdentification
    );

    @Modifying
    @Query("DELETE FROM Token t WHERE t.hash = :hash")
    void deleteByHash(
            @Param("hash") String hash
    );

}
