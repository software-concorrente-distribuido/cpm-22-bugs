package com.etheroom.Etheroom.infrastructure.vo.filter;

import com.etheroom.Etheroom.infrastructure.vo.enums.BookingStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BookingFilter {

    private String contractOwnerName;
    private String location;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private Integer roomNumber;
    private BookingStatus status;
    private String personId;
    private String hotelRoomId;
    private String hotelId;

}
