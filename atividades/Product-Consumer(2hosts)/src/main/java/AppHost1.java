import entity.CommunicationChannels;
import vo.Buffer;
import entity.Client;

public class AppHost1 {

    private static final Integer COMMUNICATION_CHANNELS_AVAILABLE = 10;
    private static final Integer MAX_ATTENDING_LINE_LENGTH = 30;
    private static final String HOST = "localhost"; // Endereço do Host 2
    private static final int PORT = 12345;

    public static void main(String[] args) {
        Buffer<Client> attendingLine = new Buffer<>(MAX_ATTENDING_LINE_LENGTH);
        new CommunicationChannels(COMMUNICATION_CHANNELS_AVAILABLE, attendingLine, HOST, PORT);
    }
}
