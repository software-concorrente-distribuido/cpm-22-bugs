package com.etheroom.Etheroom.presentation.dtos.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.aggregates.TouristSpot;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TouristSpotDto extends BaseEntityDto<TouristSpot> {

    private String touristSpot;

    @Override
    public TouristSpot mapDtoToEntity() {
        TouristSpot touristSpot = new TouristSpot();
        touristSpot.setId(this.getId());
        touristSpot.setTouristSpot(this.getTouristSpot());
        return touristSpot;
    }
}
