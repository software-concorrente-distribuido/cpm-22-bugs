package parte1;

import java.util.LinkedList;
import java.util.Queue;

public class Mailbox {

    private final Queue<String> messages = new LinkedList<>();

    public void storeMessage(String message) {
        synchronized (this.messages) {
            this.messages.offer(message);
            this.messages.notify();
        }
    }

    public String retrieveMessage() {
        synchronized (this.messages) {
            return this.messages.isEmpty() ? null : this.onPool();
        }
    }

    public void waitChanges() {
        synchronized (this.messages) {
            try {
                this.messages.wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread interrupted");
            }
        }
    }

    public Boolean isAnyItemOnQueue() {
        return !this.messages.isEmpty();
    }

    private String onPool() {
        String item = this.messages.poll();
        this.messages.notify();
        return item;
    }

}
