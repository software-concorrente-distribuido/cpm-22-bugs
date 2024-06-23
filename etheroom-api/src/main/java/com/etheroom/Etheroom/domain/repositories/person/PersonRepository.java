package com.etheroom.Etheroom.domain.repositories.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {
}
