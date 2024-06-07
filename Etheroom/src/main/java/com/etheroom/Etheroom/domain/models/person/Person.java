package com.etheroom.Etheroom.domain.models.person;

import com.etheroom.Etheroom.domain.models.address.Address;
import com.etheroom.Etheroom.domain.models.contact.Contact;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
@Table(name = "etheroom_person")
@Entity
public class Person extends BaseEntity {

    @Column(name = "name")
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    private Contact contact;

    @Override
    public PersonDto mapEntityToDto() {
        PersonDto personDto = new PersonDto();
        personDto.setId(this.getId());
        personDto.setName(this.getName());
        personDto.setUserDto(
                Optional.ofNullable(this.getUser())
                        .map(User::mapEntityToDto)
                        .orElse(null)
        );
        personDto.setAddressDto(
                Optional.ofNullable(this.getAddress())
                        .map(Address::mapEntityToDto)
                        .orElse(null)
        );
        personDto.setContactDto(
                Optional.ofNullable(this.getContact())
                        .map(Contact::mapEntityToDto)
                        .orElse(null)
        );

        return personDto;
    }

}