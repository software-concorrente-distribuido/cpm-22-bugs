package com.etheroom.Etheroom.domain.models.hotel.aggregates;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.TouristSpotDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_tourist_spot")
@Entity
public class TouristSpot extends BaseEntity {

    @Column(name = "tourist_spot")
    private String touristSpot;

    @Override
    public TouristSpotDto mapEntityToDto() {
        TouristSpotDto touristSpotDto = new TouristSpotDto();
        touristSpotDto.setId(this.getId());
        touristSpotDto.setTouristSpot(this.getTouristSpot());
        return touristSpotDto;
    }
}
