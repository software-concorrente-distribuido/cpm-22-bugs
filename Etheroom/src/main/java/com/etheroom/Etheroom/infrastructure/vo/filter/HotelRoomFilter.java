package com.etheroom.Etheroom.infrastructure.vo.filter;

import com.etheroom.Etheroom.infrastructure.vo.enums.HotelRoomType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class HotelRoomFilter {

    private Integer number;

    private HotelRoomType type;

    private Boolean available;

    private UUID hotelId;

}
