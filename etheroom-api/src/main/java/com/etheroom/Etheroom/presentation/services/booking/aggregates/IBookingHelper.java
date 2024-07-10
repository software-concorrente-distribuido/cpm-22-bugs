package com.etheroom.Etheroom.presentation.services.booking.aggregates;

import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;

import java.time.LocalDateTime;

public interface IBookingHelper {

    Boolean existsByPersonIdAndStatus(String personId, BookingStatus status);

    Boolean existsByRoomIdAndStatus(String roomId, BookingStatus status);

    Boolean existsByHotelIdAndStatus(String hotelId, BookingStatus status);

    Boolean isHotelRoomBooked(String roomId, LocalDateTime checkIn, LocalDateTime checkOut);

}
