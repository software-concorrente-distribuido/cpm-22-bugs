package com.etheroom.Etheroom.domain.models.hotel;

import com.etheroom.Etheroom.domain.models.address.Address;
import com.etheroom.Etheroom.domain.models.contact.Contact;
import com.etheroom.Etheroom.domain.models.user.User;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    private Contact contact;

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
        hotelDto.setUpdatedAt(this.getUpdatedAt());
        hotelDto.setCreatedAt(this.getCreatedAt());
        return hotelDto;
    }

}
