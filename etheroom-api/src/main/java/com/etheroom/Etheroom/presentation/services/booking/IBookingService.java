package com.etheroom.Etheroom.presentation.services.booking;

import com.etheroom.Etheroom.infrastructure.vo.filter.BookingFilter;
import com.etheroom.Etheroom.presentation.dtos.booking.BookingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IBookingService {

    BookingDto create(BookingDto bookingDto);

    Page<BookingDto> findAll(Pageable pageable, BookingFilter filter);

    Page<BookingDto> findAllRegistered(Pageable pageable, BookingFilter filter);

    BookingDto findById(String id);

    void update(BookingDto bookingDto);

    void cancel(String id);

    void delete(String id);

}
