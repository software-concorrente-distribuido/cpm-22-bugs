package com.etheroom.Etheroom.domain.repositories.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {

    @Query("SELECT p FROM Person p WHERE p.user.id = :userId")
    Optional<Person> findByUserId(UUID userId);

}
