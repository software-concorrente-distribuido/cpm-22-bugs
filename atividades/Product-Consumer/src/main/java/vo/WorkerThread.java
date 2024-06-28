package vo;

import java.util.Random;

public abstract class WorkerThread<T> extends Thread {

    private static final Double PERFORM_DURATION_VARIATION = 0.1;
    private static final Boolean DEFAULT_STANDBY_VALUE = Boolean.FALSE;

    private final Long performDuration;
    private Boolean onStandBy;

    protected final Integer identifier;
    protected final Buffer<T> buffer;

    protected WorkerThread(Integer identifier, Buffer<T> buffer, Long performDuration) {
        this.identifier = identifier;
        this.buffer = buffer;
        this.performDuration = performDuration;
        this.onStandBy = DEFAULT_STANDBY_VALUE;
    }

    @Override
    public void run() {
        while(true) {
            this.beforePerform();
            this.perform();
            this.takeUntil();
        }
    }

    protected abstract void perform();

    protected abstract void onIdle();

    protected abstract Boolean canPerform();

    private void beforePerform() {
        while(this.cantPerform()) {
            if(this.wasPerforming())
                this.onIdle();
            this.onStandBy = Boolean.TRUE;
            this.buffer.waitChanges();
        }
        this.onStandBy = Boolean.FALSE;
    }

    private void takeUntil() {
        try {
            Thread.sleep(this.taskPerformDuration());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Thread Interrupted");
        }
    }

    private Long taskPerformDuration() {
        double deviation = this.performDuration * PERFORM_DURATION_VARIATION;
        return (long) (this.performDuration + new Random().nextDouble() * 2 * deviation - deviation);
    }

    private Boolean cantPerform() {
        return !this.canPerform();
    }

    private Boolean wasPerforming() {
        return !this.onStandBy;
    }

}
