package entity;

import vo.Buffer;
import vo.WorkerThread;

public class CommunicationChannel extends WorkerThread<Client> {

    public CommunicationChannel(Integer identifier, Buffer<Client> buffer, Long performDuration) {
        super(identifier, buffer, performDuration);
    }

    @Override
    protected void perform() {
        Client client = this.generateClient();
        this.buffer.add(client);
        System.out.println(
                "PROCESSAMENTO ->       " +
                        client
                        + " em processamento "
                        + "- Canal de Atendimento "
                        + this.identifier
        );
    }

    @Override
    protected void onIdle() {
        System.out.println("FILA CHEIA    ->       Fila de Atendimento Cheia - Canal de Comunicação " + this.identifier + " em Standby");
    }

    @Override
    protected Boolean canPerform() {
        return this.buffer.isQueueLimitUnreached();
    }

    private Client generateClient() {
        return Client.build();
    }

}
