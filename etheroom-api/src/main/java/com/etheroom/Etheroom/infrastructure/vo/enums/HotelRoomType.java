package com.etheroom.Etheroom.infrastructure.vo.enums;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;

import java.util.List;
import java.util.stream.Stream;

public enum HotelRoomType {

    SINGLE("Single Room"),
    DOUBLE("Double Room"),
    TRIPLE("Triple Room"),
    QUAD("Quad Room"),
    KING("King Room");

    private final String description;

    HotelRoomType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static List<EnumDto> buildEnumDto() {
        return Stream.of(HotelRoomType.values())
                .map(hotelRoomType -> new EnumDto(hotelRoomType.name(), hotelRoomType.getDescription()))
                .toList();
    }

}
