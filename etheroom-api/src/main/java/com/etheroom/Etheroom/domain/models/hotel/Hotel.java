package com.etheroom.Etheroom.domain.models.hotel;

import com.etheroom.Etheroom.domain.models.address.Address;
import com.etheroom.Etheroom.domain.models.contact.Contact;
import com.etheroom.Etheroom.domain.models.hotel.aggregates.Convenience;
import com.etheroom.Etheroom.domain.models.hotel.aggregates.TouristSpot;
import com.etheroom.Etheroom.domain.models.media.Media;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Table(name = "etheroom_hotel")
@Entity
public class Hotel extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id", updatable = false)
    private User user;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id", updatable = false)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "contact_id", referencedColumnName = "id", updatable = false)
    private Contact contact;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "thumbnail_id", referencedColumnName = "id", updatable = false)
    private Media thumbnail;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "etheroom_hotel_conveniences",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "convenience_id")
    )
    private List<Convenience> conveniences = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "etheroom_hotel_tourist_spots",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "tourist_spot_id")
    )
    private List<TouristSpot> touristSpots = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "etheroom_hotel_images",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "media_id")
    )
    private List<Media> images = new ArrayList<>();

    @Override
    public HotelDto mapEntityToDto() {
        HotelDto hotelDto = new HotelDto();
        hotelDto.setId(this.getId());
        hotelDto.setName(this.getName());
        hotelDto.setDescription(this.getDescription());
        hotelDto.setUser(
                Optional.ofNullable(this.getUser())
                        .map(User::mapEntityToDto)
                        .orElse(null)
        );
        hotelDto.setAddress(
                Optional.ofNullable(this.getAddress())
                        .map(Address::mapEntityToDto)
                        .orElse(null)
        );
        hotelDto.setContact(
                Optional.ofNullable(this.getContact())
                        .map(Contact::mapEntityToDto)
                        .orElse(null)
        );
        hotelDto.setThumbnail(
                Optional.ofNullable(this.getThumbnail())
                        .map(Media::mapEntityToDto)
                        .orElse(null)
        );
        hotelDto.setConveniences(
                this.getConveniences().stream()
                        .map(Convenience::mapEntityToDto)
                        .toList()
        );
        hotelDto.setImages(
                this.getImages().stream()
                        .map(Media::mapEntityToDto)
                        .toList()
        );
        hotelDto.setTouristSpots(
                this.getTouristSpots().stream()
                        .map(TouristSpot::mapEntityToDto)
                        .toList()
        );
        hotelDto.setUpdatedAt(this.getUpdatedAt());
        hotelDto.setCreatedAt(this.getCreatedAt());
        return hotelDto;
    }

}
