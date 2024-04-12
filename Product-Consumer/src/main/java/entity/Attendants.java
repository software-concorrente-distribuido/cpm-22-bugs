package entity;

import vo.Buffer;
import vo.ThreadPool;
import vo.WorkerThread;

public class Attendants extends ThreadPool<Client> {

    private static final Long ATTENDANCE_DURATION = 30000L;

    public Attendants(Integer poolSize, Buffer<Client> buffer) {
        super(poolSize, buffer);
    }

    @Override
    protected WorkerThread<Client> initializeThread(Integer identifier) {
        return new Attendant(identifier, this.buffer, ATTENDANCE_DURATION);
    }

}
