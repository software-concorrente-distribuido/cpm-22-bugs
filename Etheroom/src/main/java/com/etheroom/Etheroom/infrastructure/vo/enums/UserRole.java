package com.etheroom.Etheroom.infrastructure.vo.enums;

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

}
