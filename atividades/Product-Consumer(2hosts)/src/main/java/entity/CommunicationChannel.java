package entity;

import vo.Buffer;
import vo.WorkerThread;

import java.io.ObjectOutputStream;
import java.net.Socket;

public class CommunicationChannel extends WorkerThread<Client> {

    private final String host;
    private final int port;

    public CommunicationChannel(Integer identifier, Buffer<Client> buffer, Long performDuration, String host, int port) {
        super(identifier, buffer, performDuration);
        this.host = host;
        this.port = port;
    }

    @Override
    protected void perform() {
        Client client = this.generateClient();
        try (Socket socket = new Socket(host, port);
             ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream())) {
            out.writeObject(client);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("PROCESSAMENTO ->       " + client + " em processamento - Canal de Atendimento " + this.identifier);
    }

    @Override
    protected void onIdle() {
        System.out.println("FILA CHEIA    ->       Fila de Atendimento Cheia - Canal de Comunicação " + this.identifier + " em Standby");
    }

    @Override
    protected Boolean canPerform() {
        return true; // Comunicação Channels sempre podem gerar novos clientes
    }

    private Client generateClient() {
        return Client.build();
    }
}
