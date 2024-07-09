package vo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

public abstract class ThreadPool<T> extends Thread {

    private static final Integer RANGE_INIT = 0;

    protected final List<WorkerThread<T>> threads = new ArrayList<>();

    protected final Integer poolSize;
    protected final Buffer<T> buffer;

    protected ThreadPool(Integer poolSize, Buffer<T> buffer) {
        this.poolSize = poolSize;
        this.buffer = buffer;
        this.start();
    }

    @Override
    public void run() {
        IntStream.range(RANGE_INIT, poolSize).forEach(this::initThreads);
    }

    private void initThreads(Integer identifier) {
        WorkerThread<T> worker = this.initializeThread(identifier);
        threads.add(worker);
        worker.start();
    }

    protected abstract WorkerThread<T> initializeThread(Integer identifier);
}
