package entity;

import vo.Buffer;
import vo.ThreadPool;
import vo.WorkerThread;

public class CommunicationChannels extends ThreadPool<Client> {

    private static final Long COMMUNICATION_DURATION = 12000L;

    public CommunicationChannels(Integer poolSize, Buffer<Client> buffer) {
        super(poolSize, buffer);
    }

    @Override
    protected WorkerThread<Client> initializeThread(Integer identifier) {
        return new CommunicationChannel(identifier, this.buffer, COMMUNICATION_DURATION);
    }

}
