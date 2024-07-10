package com.etheroom.Etheroom.presentation.dtos.booking.aggregates;

import com.etheroom.Etheroom.domain.models.booking.aggregates.Guest;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuestDto extends BaseEntityDto<Guest> {

    private String name;
    private String email;
    private String phone;

    @Override
    public Guest mapDtoToEntity() {
        Guest guest = new Guest();
        guest.setId(this.getId());
        guest.setName(this.name);
        guest.setEmail(this.email);
        guest.setPhone(this.phone);
        return guest;
    }

}
