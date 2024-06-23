package com.etheroom.Etheroom.presentation.dtos.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.presentation.dtos.address.AddressDto;
import com.etheroom.Etheroom.presentation.dtos.contact.ContactDto;
import com.etheroom.Etheroom.presentation.dtos.user.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class HotelDto extends BaseEntityDto<Hotel> {

    private String name;
    private String description;
    private UserDto user;
    private AddressDto address;
    private ContactDto contact;

    @Override
    public Hotel mapDtoToEntity() {
        Hotel hotel = new Hotel();
        hotel.setId(this.getId());
        hotel.setName(this.getName());
        hotel.setDescription(this.getDescription());
        hotel.setUser(
                Optional.ofNullable(this.getUser())
                        .map(UserDto::mapDtoToEntity)
                        .orElse(null)
        );
        hotel.setAddress(
                Optional.ofNullable(this.getAddress())
                        .map(AddressDto::mapDtoToEntity)
                        .orElse(null)
        );
        hotel.setContact(
                Optional.ofNullable(this.getContact())
                        .map(ContactDto::mapDtoToEntity)
                        .orElse(null)
        );
        hotel.setUpdatedAt(this.getUpdatedAt());
        hotel.setCreatedAt(this.getCreatedAt());
        return hotel;
    }

}
