package com.etheroom.Etheroom.presentation.services.person;

import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;

public interface IPersonService {

    PersonDto create(PersonDto personDto);

    PersonDto findById(String id);

    void update(PersonDto personDto);

    void delete(String id);

}
