package com.etheroom.Etheroom.domain.services.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import com.etheroom.Etheroom.domain.repositories.person.PersonRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;
import com.etheroom.Etheroom.presentation.services.person.IPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonService implements IPersonService {

    private static final String PERSON_NOT_FOUND = "Person not found";

    private final PersonRepository personRepository;

    @Override
    public PersonDto create(PersonDto personDto) {
        Functions.acceptTrueThrows(
                this.personRepository.existsById(personDto.getId()),
                () -> new NotFoundException(PERSON_NOT_FOUND)
        );
        Person person = personDto.mapDtoToEntity();
        return this.personRepository.save(person).mapEntityToDto();
    }

    @Override
    public PersonDto findById(String id) {
        return this.personRepository.findById(UUID.fromString(id))
                .map(Person::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(PERSON_NOT_FOUND));
    }

    @Override
    public void update(PersonDto personDto) {
        Person person = personDto.mapDtoToEntity();
        this.personRepository.save(person);
    }

    @Override
    public void delete(String id) {
        UUID personId = UUID.fromString(id);
        Functions.acceptFalseThrows(
                this.personRepository.existsById(personId),
                () -> new NotFoundException(PERSON_NOT_FOUND)
        );
        this.personRepository.deleteById(personId);
    }
}