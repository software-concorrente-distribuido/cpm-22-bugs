package com.etheroom.Etheroom.domain.services.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.domain.repositories.person.PersonRepository;
import com.etheroom.Etheroom.infrastructure.utils.Functions;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.infrastructure.vo.enums.UserRole;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.BadRequestException;
import com.etheroom.Etheroom.infrastructure.vo.exception.exceptions.NotFoundException;
import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;
import com.etheroom.Etheroom.presentation.services.booking.aggregates.IBookingHelper;
import com.etheroom.Etheroom.presentation.services.person.IPersonService;
import com.etheroom.Etheroom.presentation.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonService implements IPersonService {

    private static final String PERSON_NOT_FOUND = "Person not found";

    private static final String ONGOING_BOOKING = "There is an ongoing booking for this person";

    private final PersonRepository personRepository;

    private final IBookingHelper bookingHelper;

    private final IUserService userService;

    @Override
    public PersonDto create(PersonDto personDto) {
        Person person = personDto.mapDtoToEntity();
        User user = person.getUser();
        this.userService.handleUserByRole(user, UserRole.USER);
        person.setUser(user);
        return this.personRepository.save(person).mapEntityToDto();
    }

    @Override
    public PersonDto findById(String id) {
        return this.personRepository.findById(UUID.fromString(id))
                .map(Person::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(PERSON_NOT_FOUND));
    }

    @Override
    public PersonDto findByUserId(String userId) {
        return this.personRepository.findByUserId(UUID.fromString(userId))
                .map(Person::mapEntityToDto)
                .orElseThrow(() -> new NotFoundException(PERSON_NOT_FOUND));
    }

    @Override
    public void update(PersonDto personDto) {
        Functions.acceptTrueThrows(
                Optional.ofNullable(personDto.getId()).isPresent() && this.personRepository.existsById(personDto.getId()),
                () -> new NotFoundException(PERSON_NOT_FOUND)
        );
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
        Functions.acceptTrueThrows(
                this.bookingHelper.existsByPersonIdAndStatus(id, BookingStatus.ACTIVE),
                () -> new BadRequestException(ONGOING_BOOKING)
        );
        this.personRepository.deleteById(personId);
    }
}