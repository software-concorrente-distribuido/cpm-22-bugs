package com.etheroom.Etheroom.domain.models.hotel;

import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "etheroom_hotel")
@Entity
public class Hotel extends BaseEntity {

    @Override
    public HotelDto mapEntityToDto() {
        return null;
    }

}
