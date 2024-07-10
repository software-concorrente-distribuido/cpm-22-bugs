package com.etheroom.Etheroom.presentation.dtos.booking;

import com.etheroom.Etheroom.domain.models.booking.Booking;
import com.etheroom.Etheroom.infrastructure.base.BaseEntityDto;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.presentation.dtos.booking.aggregates.GuestDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class BookingDto extends BaseEntityDto<Booking> {

    private UUID hotelRoomId;
    private UUID personId;
    private BookingStatus status;
    private Double totalPrice;
    private Integer numberOfGuests;
    private String ethereumTransactionAddress;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private List<GuestDto> guests = new ArrayList<>();

    @Override
    public Booking mapDtoToEntity() {
        Booking booking = new Booking();
        booking.setId(this.getId());
        booking.setStatus(this.getStatus());
        booking.setTotalPrice(this.getTotalPrice());
        booking.setNumberOfGuests(this.getNumberOfGuests());
        booking.setEthereumTransactionAddress(this.getEthereumTransactionAddress());
        booking.setCheckIn(this.getCheckIn());
        booking.setCheckOut(this.getCheckOut());
        booking.setGuests(
                this.getGuests().stream()
                        .map(GuestDto::mapDtoToEntity)
                        .toList()
        );
        booking.setPersonId(this.getPersonId());
        booking.setHotelRoomId(this.getHotelRoomId());
        return booking;
    }

}
