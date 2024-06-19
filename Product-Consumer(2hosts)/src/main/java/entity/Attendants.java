package entity;

import vo.Buffer;
import vo.ThreadPool;
import vo.WorkerThread;

public class Attendants extends ThreadPool<Client> {

    private static final Long ATTENDANCE_DURATION = 30000L;
    private final int port;

    public Attendants(Integer poolSize, Buffer<Client> buffer, int port) {
        super(poolSize, buffer);
        this.port = port;
    }

    @Override
    protected WorkerThread<Client> initializeThread(Integer identifier) {
        return new Attendant(identifier, this.buffer, ATTENDANCE_DURATION, port);
    }
}
