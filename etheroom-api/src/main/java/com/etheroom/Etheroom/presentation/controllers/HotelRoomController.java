package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.infrastructure.vo.filter.HotelRoomFilter;
import com.etheroom.Etheroom.presentation.dtos.hotel.aggregates.HotelRoomDto;
import com.etheroom.Etheroom.presentation.services.hotel.aggregates.IHotelRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/hotel-room")
@RequiredArgsConstructor
public class HotelRoomController {

    private final IHotelRoomService hotelRoomService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HotelRoomDto create(HotelRoomDto hotelRoomDto) {
        return hotelRoomService.create(hotelRoomDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<HotelRoomDto> findAll(Pageable pageable, HotelRoomFilter filter) {
        return hotelRoomService.findAll(pageable, filter);
    }

    @GetMapping("/available")
    @ResponseStatus(HttpStatus.OK)
    public Page<HotelRoomDto> findAllAvailable(Pageable pageable, HotelRoomFilter filter) {
        return hotelRoomService.findAllAvailable(pageable, filter);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HotelRoomDto findById(@PathVariable String id) {
        return hotelRoomService.findById(id);
    }

    @GetMapping("/{id}/booked")
    @ResponseStatus(HttpStatus.OK)
    public Boolean isHotelRoomBooked(@PathVariable String id, LocalDateTime checkIn, LocalDateTime checkOut) {
        return hotelRoomService.isHotelRoomBooked(id, checkIn, checkOut);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(HotelRoomDto hotelRoomDto) {
        hotelRoomService.update(hotelRoomDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        hotelRoomService.delete(id);
    }

}
