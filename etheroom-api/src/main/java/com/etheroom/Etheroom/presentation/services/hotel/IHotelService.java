package com.etheroom.Etheroom.presentation.services.hotel;

import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;

public interface IHotelService {

    HotelDto create(HotelDto personDto);

    HotelDto findById(String id);

    void update(HotelDto personDto);

    void delete(String id);

}
