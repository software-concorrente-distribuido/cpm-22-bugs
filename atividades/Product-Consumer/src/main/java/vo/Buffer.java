package vo;

import java.util.LinkedList;
import java.util.Queue;

public class Buffer<T> {

    private final Integer bufferLimit;
    private final Queue<T> items = new LinkedList<>();

    public Buffer(Integer bufferLimit) {
        this.bufferLimit = bufferLimit;
    }

    public void add(T newItem) {
        if(this.isQueueLimitUnreached()) {
            synchronized (items) {
                this.items.offer(newItem);
                this.items.notify();
            }
        }
    }

    public T poll() {
        synchronized (this.items) {
            return this.isQueueEmpty() ? null : this.onPool();
        }
    }

    public void waitChanges() {
        synchronized (this.items) {
            try {
                this.items.wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Thread interrupted");
            }
        }
    }

    public Boolean isQueueLimitUnreached() {
        return this.items.size() <= this.bufferLimit;
    }

    public Boolean isAnyItemOnQueue() {
        return !this.items.isEmpty();
    }

    public Boolean isQueueEmpty() {
        return this.items.isEmpty();
    }

    private T onPool() {
        T item = this.items.poll();
        this.items.notify();
        return item;
    }

}