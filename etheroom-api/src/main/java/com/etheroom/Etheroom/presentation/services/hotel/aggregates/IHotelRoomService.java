package com.etheroom.Etheroom.presentation.services.hotel.aggregates;

import com.etheroom.Etheroom.infrastructure.vo.filter.HotelRoomFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.HotelRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface IHotelRoomService {

    HotelRoomDto create(HotelRoomDto hotelRoomDto);

    Page<HotelRoomDto> findAll(Pageable pageable, HotelRoomFilter filter);

    Page<HotelRoomDto> findAllAvailable(Pageable pageable, HotelRoomFilter filter);

    HotelRoomDto findById(String id);

    Boolean isHotelRoomBooked(String roomId, LocalDateTime checkIn, LocalDateTime checkOut);

    void update(HotelRoomDto hotelRoomDto);

    void delete(String id);

}
