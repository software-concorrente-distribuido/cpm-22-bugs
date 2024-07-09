package com.etheroom.Etheroom.domain.models.booking.aggregates;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.presentation.dtos.booking.aggregates.GuestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_guest")
@Entity
public class Guest extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Override
    public GuestDto mapEntityToDto() {
        GuestDto guestDto = new GuestDto();
        guestDto.setId(this.getId());
        guestDto.setName(this.name);
        guestDto.setEmail(this.email);
        guestDto.setPhone(this.phone);
        return guestDto;
    }

}
