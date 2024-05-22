package com.etheroom.Etheroom.domain.repositories;

import com.etheroom.Etheroom.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Boolean existsByAddress(String address);

    User findByAddress(String address);

}
