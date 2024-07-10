package com.etheroom.Etheroom.infrastructure.vo.enums;

import org.apache.coyote.BadRequestException;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum MediaType {

    JPG,
    JPEG,
    PNG,
    TXT,
    DOCX,
    PDF;

    public static MediaType fromFileOriginalName(String originalName) throws BadRequestException {
        try {
            String extension = originalName.substring(originalName.lastIndexOf(".") + 1).toUpperCase();
            return MediaType.valueOf(extension);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Extensão de arquivo inválida. Extensões aceitas: " + acceptedFileExtensions());
        }
    }

    public static String acceptedFileExtensions() {
        return Stream.of(MediaType.values())
                .map(Enum::name)
                .collect(Collectors.joining(", "));
    }

}
