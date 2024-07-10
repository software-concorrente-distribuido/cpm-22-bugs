package com.etheroom.Etheroom.domain.models.hotel.aggregates;

import com.etheroom.Etheroom.domain.models.hotel.Hotel;
import com.etheroom.Etheroom.domain.models.media.Media;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.vo.enums.HotelRoomType;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.HotelRoomDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Table(name = "etheroom_hotel_room")
@Entity
public class HotelRoom extends BaseEntity {

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private HotelRoomType type;

    @Column(name = "price")
    private Double price;

    @Column(name = "number")
    private Integer number;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "available")
    private Boolean available;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "etheroom_hotel_room_convenience",
            joinColumns = @JoinColumn(name = "hotel_room_id"),
            inverseJoinColumns = @JoinColumn(name = "convenience_id")
    )
    private List<Convenience> conveniences = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false, referencedColumnName = "id", updatable = false)
    private Hotel hotel;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "thumbnail_id", referencedColumnName = "id")
    private Media thumbnail;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "etheroom_hotel_room_images",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "media_id")
    )
    private List<Media> images = new ArrayList<>();

    @Override
    public HotelRoomDto mapEntityToDto() {
        HotelRoomDto hotelRoomDto = new HotelRoomDto();
        hotelRoomDto.setId(this.getId());
        hotelRoomDto.setDescription(this.getDescription());
        hotelRoomDto.setType(this.getType());
        hotelRoomDto.setPrice(this.getPrice());
        hotelRoomDto.setNumber(this.getNumber());
        hotelRoomDto.setCapacity(this.getCapacity());
        hotelRoomDto.setAvailable(this.getAvailable());
        hotelRoomDto.setConveniences(
                this.getConveniences().stream()
                        .map(Convenience::mapEntityToDto)
                        .toList()
        );
        hotelRoomDto.setHotelId(this.getHotel().getId());
        hotelRoomDto.setThumbnail(
                Optional.ofNullable(this.getThumbnail())
                        .map(Media::mapEntityToDto)
                        .orElse(null)
        );
        hotelRoomDto.setImages(
                this.getImages().stream()
                        .map(Media::mapEntityToDto)
                        .toList()
        );
        hotelRoomDto.setUpdatedAt(this.getUpdatedAt());
        hotelRoomDto.setCreatedAt(this.getCreatedAt());
        return hotelRoomDto;
    }
}
