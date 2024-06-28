package entity;

import java.util.Random;

public record Client(Integer id) {

    private static final Integer MAX_ID_VALUE = 1000;

    public static Client build() {
        return new Client(generateClientId());
    }

    @Override
    public String toString() {
        return "Cliente " + this.id;
    }

    private static Integer generateClientId() {
        return new Random().nextInt(MAX_ID_VALUE) + 1;
    }

}
