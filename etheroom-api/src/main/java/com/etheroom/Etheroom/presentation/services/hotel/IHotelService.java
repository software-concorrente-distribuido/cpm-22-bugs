package com.etheroom.Etheroom.presentation.services.hotel;

import com.etheroom.Etheroom.infrastructure.vo.filter.HotelFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IHotelService {

    HotelDto create(HotelDto personDto);

    Page<HotelDto> findAll(Pageable pageable, HotelFilter filter);

    Page<HotelDto> findMostBooked(Pageable pageable);

    HotelDto findById(String id);

    HotelDto findByUserId(String userId);

    void update(HotelDto personDto);

    void delete(String id);

}
