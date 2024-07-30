package com.etheroom.Etheroom.presentation.controllers.publics;

import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import com.etheroom.Etheroom.presentation.services.hotel.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/hotel")
@RequiredArgsConstructor
public class HotelPublicController {

    private final IHotelService hotelService;

    @GetMapping("/most-booked")
    @ResponseStatus(HttpStatus.OK)
    public Page<HotelDto> findMostBooked(Pageable pageable) {
        return hotelService.findMostBooked(pageable);
    }

}
