package com.etheroom.Etheroom.infrastructure.vo.enums;

import com.etheroom.Etheroom.presentation.dtos.app.EnumDto;

import java.util.Arrays;
import java.util.List;

public enum UserRole {

    USER("User"),
    HOTEL("Hotel");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static List<EnumDto> buildEnumDto() {
        return Arrays.stream(UserRole.values())
                .map(userRole -> new EnumDto(userRole.name(), userRole.getDescription()))
                .toList();
    }

}
