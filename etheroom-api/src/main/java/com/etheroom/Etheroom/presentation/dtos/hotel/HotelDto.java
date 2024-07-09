package com.etheroom.Etheroom.presentation.dtos.hotel;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.presentation.dtos.address.AddressDto;
import com.etheroom.Etheroom.presentation.dtos.contact.ContactDto;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.ConvenienceDto;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.TouristSpotDto;
import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import com.etheroom.Etheroom.presentation.dtos.user.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class HotelDto extends BaseEntityDto<Hotel> {

    private String name;
    private String description;
    private UserDto user;
    private AddressDto address;
    private ContactDto contact;
    private MediaDto thumbnail;
    private List<ConvenienceDto> conveniences = new ArrayList<>();
    private List<MediaDto> images = new ArrayList<>();
    private List<TouristSpotDto> touristSpots = new ArrayList<>();

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
        hotel.setThumbnail(
                Optional.ofNullable(this.getThumbnail())
                        .map(MediaDto::mapDtoToEntity)
                        .orElse(null)
        );
        hotel.setConveniences(
                this.getConveniences()
                        .stream()
                        .map(ConvenienceDto::mapDtoToEntity)
                        .toList()
        );
        hotel.setImages(
                this.getImages().stream()
                        .map(MediaDto::mapDtoToEntity)
                        .toList()
        );
        hotel.setTouristSpots(
                this.getTouristSpots()
                        .stream()
                        .map(TouristSpotDto::mapDtoToEntity)
                        .toList()
        );
        hotel.setUpdatedAt(this.getUpdatedAt());
        hotel.setCreatedAt(this.getCreatedAt());
        return hotel;
    }

}
