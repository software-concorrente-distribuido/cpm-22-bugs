package com.etheroom.Etheroom.infrastructure.vo.filter;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class HotelFilter {

    private String location;

    private LocalDateTime checkIn;

    private LocalDateTime checkOut;

    private Integer numberOfGuests;

}
