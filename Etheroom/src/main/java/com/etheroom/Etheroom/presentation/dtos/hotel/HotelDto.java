package com.etheroom.Etheroom.presentation.dtos.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotelDto extends BaseEntityDto<Hotel> {

    @Override
    public Hotel mapDtoToEntity() {
        return null;
    }

}
