package entity;

import vo.Buffer;
import vo.WorkerThread;

import java.io.ObjectInputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Attendant extends WorkerThread<Client> {

    private final int port;

    public Attendant(Integer identifier, Buffer<Client> buffer, Long performDuration, int port) {
        super(identifier, buffer, performDuration);
        this.port = port;
    }

    @Override
    protected void perform() {
        try (ServerSocket serverSocket = new ServerSocket(port);
             Socket socket = serverSocket.accept();
             ObjectInputStream in = new ObjectInputStream(socket.getInputStream())) {
            Client client = (Client) in.readObject();
            if (client != null) {
                attend(client);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onIdle() {
        System.out.println("FILA VAZIA    ->       " + "Atendente " + identifier + " está ocioso e aguardando novo cliente");
    }

    @Override
    protected Boolean canPerform() {
        return true; // Atendentes sempre podem aceitar novos clientes
    }

    private void attend(Client client) {
        System.out.println("ATENDIMENTO   ->       " + client + " em atendimento - Atendente " + identifier);
    }
}
