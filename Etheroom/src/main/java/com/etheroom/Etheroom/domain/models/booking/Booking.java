package com.etheroom.Etheroom.domain.models.booking;

import com.etheroom.Etheroom.domain.models.booking.aggregates.Guest;
import com.etheroom.Etheroom.domain.models.hotel.aggregates.HotelRoom;
import com.etheroom.Etheroom.domain.models.person.Person;
import com.etheroom.Etheroom.infrastructure.base.BaseEntity;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.presentation.dtos.booking.BookingDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Setter
@Table(name = "etheroom_booking")
@Entity
public class Booking extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "hotel_room_id", referencedColumnName = "id", updatable = false)
    private HotelRoom hotelRoom;

    @OneToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id", updatable = false)
    private Person person;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "number_of_guests")
    private Integer numberOfGuests;

    @Column(name = "ethereum_transaction_address")
    private String ethereumTransactionAddress;

    @Column(name = "check_in")
    private LocalDateTime checkIn;

    @Column(name = "check_out")
    private LocalDateTime checkOut;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private List<Guest> guests = new ArrayList<>();

    @Transient
    private UUID personId;

    @Transient
    private UUID hotelRoomId;

    @Override
    public BookingDto mapEntityToDto() {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(this.getId());
        bookingDto.setHotelRoomId(
                Optional.ofNullable(this.getHotelRoom())
                        .map(HotelRoom::getId)
                        .orElse(null)
        );
        bookingDto.setPersonId(
                Optional.ofNullable(this.getPerson())
                        .map(Person::getId)
                        .orElse(null)
        );
        bookingDto.setStatus(this.getStatus());
        bookingDto.setTotalPrice(this.getTotalPrice());
        bookingDto.setNumberOfGuests(this.getNumberOfGuests());
        bookingDto.setEthereumTransactionAddress(this.getEthereumTransactionAddress());
        bookingDto.setCheckIn(this.getCheckIn());
        bookingDto.setCheckOut(this.getCheckOut());
        bookingDto.setGuests(
                this.getGuests().stream()
                        .map(Guest::mapEntityToDto)
                        .toList()
        );
        return bookingDto;
    }

}
