package com.etheroom.Etheroom.presentation.services.booking.aggregates;

import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;

public interface IBookingHelper {

    Boolean existsByPersonIdAndStatus(String personId, BookingStatus status);

    Boolean existsByRoomIdAndStatus(String roomId, BookingStatus status);

    Boolean existsByHotelIdAndStatus(String roomId, BookingStatus status);

}
