package entity;

import java.io.Serializable;
import java.util.Random;

public class Client implements Serializable {
    private static final long serialVersionUID = 1L;
    private final Integer id;
    private static final Integer MAX_ID_VALUE = 1000;

    public Client(Integer id) {
        this.id = id;
    }

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
