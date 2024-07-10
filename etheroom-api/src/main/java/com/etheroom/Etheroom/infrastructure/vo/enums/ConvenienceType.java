package com.etheroom.Etheroom.infrastructure.vo.enums;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;

import java.util.List;
import java.util.stream.Stream;

public enum ConvenienceType {
    SWIMMING_POOLS("Swimming pools", true),
    PRIVATE_PARKING("Private parking", true),
    FREE_WIFI("Free Wi-Fi", true),
    BAR("Bar", true),
    ROOM_SERVICE("Room Service", true),
    RESTAURANTS("Restaurants", true),
    GYM("Gym", true),
    BREAKFAST("Breakfast", true),
    SPA("Spa", true),
    PRIVATE_BEACH("Private beach", true),
    TEA_AND_COFFEE_MAKER("Tea and coffee maker", true),
    SEASHORE("Seashore", true),
    FLAT_SCREEN_TV("Flat-screen TV", false),
    WORK_DESK("Work Desk", false),
    IRON_AND_IRONING_BOARD("Iron and ironing board", false),
    FREE_TOILETS("Free toilets", false),
    HAIRDRYER("Hairdryer", false),
    FREE_UNLIMITED_WIFI("Free unlimited Wi-Fi", false),
    COFFEE_AND_TEA_MAKER("Coffee & Tea Maker", false),
    TELEPHONE("Telephone", false);

    private final String description;

    private final Boolean forHotel;

    ConvenienceType(String description, Boolean forHotel) {
        this.description = description;
        this.forHotel = forHotel;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getForHotel() {
        return forHotel;
    }

    public static List<EnumDto> buildEnumDto() {
        return Stream.of(ConvenienceType.values())
                .filter(convenienceType -> !convenienceType.getForHotel())
                .map(convenienceType -> new EnumDto(convenienceType.name(), convenienceType.getDescription()))
                .toList();
    }

    public static List<EnumDto> buildEnumDtoForHotelConvenience() {
        return Stream.of(ConvenienceType.values())
                .filter(ConvenienceType::getForHotel)
                .map(convenienceType -> new EnumDto(convenienceType.name(), convenienceType.getDescription()))
                .toList();
    }

}
