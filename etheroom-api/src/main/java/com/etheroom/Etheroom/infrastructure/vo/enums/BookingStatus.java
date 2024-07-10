package com.etheroom.Etheroom.infrastructure.vo.enums;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;

import java.util.Arrays;
import java.util.List;

public enum BookingStatus {

    STARTED("Started"),
    ACTIVE("Active"),
    CANCELLED("Cancelled"),
    FINISHED("Finished");

    private final String description;

    BookingStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static List<EnumDto> buildEnumDto() {
        return Arrays.stream(BookingStatus.values())
                .map(bookingStatus -> new EnumDto(bookingStatus.name(), bookingStatus.getDescription()))
                .toList();
    }

}
