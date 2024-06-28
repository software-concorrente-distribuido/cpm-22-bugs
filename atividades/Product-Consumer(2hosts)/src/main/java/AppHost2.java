import entity.Attendants;
import vo.Buffer;
import entity.Client;

public class AppHost2 {

    private static final Integer ATTENDANTS_AVAILABLE = 5;
    private static final Integer MAX_ATTENDING_LINE_LENGTH = 30;
    private static final int PORT = 12345;

    public static void main(String[] args) {
        Buffer<Client> attendingLine = new Buffer<>(MAX_ATTENDING_LINE_LENGTH);
        new Attendants(ATTENDANTS_AVAILABLE, attendingLine, PORT);
    }
}
