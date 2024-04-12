package entity;

import vo.Buffer;
import vo.WorkerThread;

import java.util.Optional;

public class Attendant extends WorkerThread<Client> {

    public Attendant(Integer identifier, Buffer<Client> buffer, Long performDuration) {
        super(identifier, buffer, performDuration);
    }

    @Override
    protected void perform() {
        Optional.ofNullable(this.buffer.poll())
                .ifPresent(this::attend);
    }

    @Override
    protected void onIdle() {
        System.out.println("FILA VAZIA    ->       " + "Atendente " + identifier + " está ocioso e aguardando novo cliente");
    }

    @Override
    protected Boolean canPerform() {
        return this.buffer.isAnyItemOnQueue();
    }

    private void attend(Client client) {
        System.out.println("ATENDIMENTO   ->       " + client + " em atendimento - Atendente " + identifier);
    }

}
