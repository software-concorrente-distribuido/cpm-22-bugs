package com.etheroom.Etheroom.domain.repositories.user;

import com.etheroom.Etheroom.domain.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    User findByEthereumAddress(String ethereumAddress);

}
