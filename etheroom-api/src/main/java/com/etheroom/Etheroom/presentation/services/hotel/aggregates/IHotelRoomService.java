package com.etheroom.Etheroom.presentation.services.hotel.aggregates;

import com.etheroom.Etheroom.infrastructure.vo.filter.HotelRoomFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.HotelRoomDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IHotelRoomService {

    HotelRoomDto create(HotelRoomDto hotelRoomDto);

    Page<HotelRoomDto> findAll(Pageable pageable, HotelRoomFilter filter);

    Page<HotelRoomDto> findAllAvailable(Pageable pageable, HotelRoomFilter filter);

    HotelRoomDto findById(String id);

    void update(HotelRoomDto hotelRoomDto);

    void delete(String id);

}
