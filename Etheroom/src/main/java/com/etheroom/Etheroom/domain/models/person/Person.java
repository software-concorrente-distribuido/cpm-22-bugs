package com.etheroom.Etheroom.domain.models.person;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.person.PersonDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_person")
@Entity
public class Person extends BaseEntity {

    @Override
    public PersonDto mapEntityToDto() {
        return null;
    }

}
