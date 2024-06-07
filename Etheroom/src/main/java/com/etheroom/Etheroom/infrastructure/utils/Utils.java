package com.etheroom.Etheroom.infrastructure.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;
import java.util.UUID;

public class Utils {

    private static final String LOCAL_DATE_TIME_FORMAT = "dd MMMM yyyy HH:mm:ss";

    private static final String ETHEREUM_ADDRESS_REGEX = "^0x[a-fA-F0-9]{40}$";

    public static String generateRandomFourDigitsCode() {
        Random generator = new Random();
        return Integer.toString(generator.nextInt(8999) + 1000);
    }

    public static String generateRandomHash() {
        return UUID.randomUUID().toString().replaceAll("-", "").substring(0, 24);
    }

    public static String currentLocalDateTimeFormatted() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(LOCAL_DATE_TIME_FORMAT));
    }

    public static Boolean isEthereumAddressValid(String address) {
        return address.matches(ETHEREUM_ADDRESS_REGEX);
    }

}
