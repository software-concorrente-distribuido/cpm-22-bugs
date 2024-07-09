package com.etheroom.Etheroom.infrastructure.vo.enums;

public enum TokenType {

    PASSWORD_RESET("Token para Redefinição de Senha");
    private final String description;

    TokenType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
