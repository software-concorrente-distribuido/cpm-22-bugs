package com.etheroom.Etheroom.presentation.dtos.person;

import com.etheroom.Etheroom.domain.models.person.Person;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.presentation.dtos.address.AddressDto;
import com.etheroom.Etheroom.presentation.dtos.contact.ContactDto;
import com.etheroom.Etheroom.presentation.dtos.user.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class PersonDto extends BaseEntityDto<Person> {

    private String name;
    private UserDto user;
    private AddressDto address;
    private ContactDto contact;

    @Override
    public Person mapDtoToEntity() {
        Person person = new Person();
        person.setId(this.getId());
        person.setName(this.getName());
        person.setUser(
                Optional.ofNullable(this.getUser())
                        .map(UserDto::mapDtoToEntity)
                        .orElse(null)
        );
        person.setAddress(
                Optional.ofNullable(this.getAddress())
                        .map(AddressDto::mapDtoToEntity)
                        .orElse(null)
        );
        person.setContact(
                Optional.ofNullable(this.getContact())
                        .map(ContactDto::mapDtoToEntity)
                        .orElse(null)
        );

        return person;
    }

}