package com.etheroom.Etheroom.domain.services.booking.aggregates;

import com.etheroom.Etheroom.domain.repositories.booking.BookingRepository;
import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import com.etheroom.Etheroom.presentation.services.booking.aggregates.IBookingHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingHelper implements IBookingHelper {

    private final BookingRepository bookingRepository;

    @Override
    public Boolean existsByPersonIdAndStatus(String personId, BookingStatus status) {
        return this.bookingRepository.existsByPersonIdAndStatus(UUID.fromString(personId), status);
    }

    @Override
    public Boolean existsByRoomIdAndStatus(String roomId, BookingStatus status) {
        return this.bookingRepository.existsByRoomIdAndStatus(UUID.fromString(roomId), status);
    }

    @Override
    public Boolean existsByHotelIdAndStatus(String roomId, BookingStatus status) {
        return this.bookingRepository.existsByHotelIdAndStatus(UUID.fromString(roomId), status);
    }

}
