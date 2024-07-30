package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.infrastructure.vo.filter.HotelFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.HotelDto;
import com.etheroom.Etheroom.presentation.services.hotel.IHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotel")
@RequiredArgsConstructor
public class HotelController {

    private final IHotelService hotelService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelDto create(@RequestBody HotelDto hotelDto) {
        return hotelService.create(hotelDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<HotelDto> findAll(Pageable pageable, HotelFilter filter) {
        return hotelService.findAll(pageable, filter);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HotelDto findById(@PathVariable String id) {
        return hotelService.findById(id);
    }

    @GetMapping(value = "/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public HotelDto findByUserId(@PathVariable String userId) {
        return hotelService.findByUserId(userId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody HotelDto hotelDto) {
        hotelService.update(hotelDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        hotelService.delete(id);
    }

}
