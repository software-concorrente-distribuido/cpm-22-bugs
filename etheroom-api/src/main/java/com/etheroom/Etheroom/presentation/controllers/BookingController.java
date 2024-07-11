package com.etheroom.Etheroom.presentation.controllers;

import com.etheroom.Etheroom.infrastructure.vo.filter.BookingFilter;
import com.etheroom.Etheroom.presentation.dtos.booking.BookingDto;
import com.etheroom.Etheroom.presentation.services.booking.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {

    private final IBookingService bookingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingDto create(@RequestBody BookingDto bookingDto) {
        return this.bookingService.create(bookingDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingDto> findAll(Pageable pageable, BookingFilter filter) {
        return this.bookingService.findAll(pageable, filter);
    }

    @GetMapping("/registered")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookingDto> findAllRegistered(Pageable pageable, BookingFilter filter) {
        return this.bookingService.findAllRegistered(pageable, filter);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BookingDto findById(@PathVariable String id) {
        return this.bookingService.findById(id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody BookingDto bookingDto) {
        this.bookingService.update(bookingDto);
    }

    @PutMapping("/{id}/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancel(@PathVariable String id) {
        this.bookingService.cancel(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable String id) {
        this.bookingService.delete(id);
    }

}
