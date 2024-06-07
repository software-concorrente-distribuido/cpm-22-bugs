package com.etheroom.Etheroom.presentation.dtos.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonDto extends BaseEntityDto<Person> {

    @Override
    public Person mapDtoToEntity() {
        return null;
    }

}
