package entity;

import vo.Buffer;
import vo.ThreadPool;
import vo.WorkerThread;

public class CommunicationChannels extends ThreadPool<Client> {

    private static final Long COMMUNICATION_DURATION = 12000L;
    private final String host;
    private final int port;

    public CommunicationChannels(Integer poolSize, Buffer<Client> buffer, String host, int port) {
        super(poolSize, buffer);
        this.host = host;
        this.port = port;
    }

    @Override
    protected WorkerThread<Client> initializeThread(Integer identifier) {
        return new CommunicationChannel(identifier, this.buffer, COMMUNICATION_DURATION, host, port);
    }
}
