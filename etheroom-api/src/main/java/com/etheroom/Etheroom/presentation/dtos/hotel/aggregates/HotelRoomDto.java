package com.etheroom.Etheroom.presentation.dtos.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.domain.models.hotel.aggregates.HotelRoom;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.HotelRoomType;
import com.etheroom.Etheroom.presentation.dtos.media.MediaDto;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Setter
public class HotelRoomDto extends BaseEntityDto<HotelRoom> {

    private String description;
    private HotelRoomType type;
    private Double price;
    private Integer number;
    private Integer capacity;
    private Boolean available;
    private List<ConvenienceDto> conveniences = new ArrayList<>();
    private UUID hotelId;
    private MediaDto thumbnail;
    private List<MediaDto> images = new ArrayList<>();

    @Override
    public HotelRoom mapDtoToEntity() {
        HotelRoom hotelRoom = new HotelRoom();
        hotelRoom.setId(this.getId());
        hotelRoom.setDescription(this.getDescription());
        hotelRoom.setType(this.getType());
        hotelRoom.setPrice(this.getPrice());
        hotelRoom.setHotel(
                Optional.ofNullable(this.getHotelId())
                        .map(id -> {
                            var hotel = new Hotel();
                            hotel.setId(id);
                            return hotel;
                        })
                        .orElse(null)
        );
        hotelRoom.setNumber(this.getNumber());
        hotelRoom.setCapacity(this.getCapacity());
        hotelRoom.setAvailable(this.getAvailable());
        hotelRoom.setThumbnail(
                Optional.ofNullable(this.getThumbnail())
                        .map(MediaDto::mapDtoToEntity)
                        .orElse(null)
        );
        hotelRoom.setImages(
                this.getImages().stream()
                        .map(MediaDto::mapDtoToEntity)
                        .toList()
        );
        hotelRoom.setConveniences(
                this.getConveniences()
                        .stream()
                        .map(ConvenienceDto::mapDtoToEntity)
                        .toList()
        );
        hotelRoom.setUpdatedAt(this.getUpdatedAt());
        hotelRoom.setCreatedAt(this.getCreatedAt());
        return hotelRoom;
    }
}
