package parte1;

import java.util.Optional;
import java.util.Random;

public class Consumer extends Thread {

    private static final Double PERFORM_DURATION_VARIATION = 0.1;
    private static final Boolean DEFAULT_STANDBY_VALUE = Boolean.FALSE;

    private final Long performDuration;
    private Boolean onStandBy;

    protected final Integer identifier;
    protected final Mailbox mailbox;

    protected Consumer(Integer identifier, Mailbox mailbox, Long performDuration) {
        this.identifier = identifier;
        this.mailbox = mailbox;
        this.performDuration = performDuration;
        this.onStandBy = DEFAULT_STANDBY_VALUE;
    }

    public void run() {
        while(true) {
            this.beforePerform();
            this.perform();
            this.takeUntil();
        }
    }

    private void perform() {
        Optional.ofNullable(this.mailbox.retrieveMessage())
                .ifPresent(this::upload);
    }

    private void onIdle() {
        System.out.println("FILA VAZIA    ->       " + "Consumer " + identifier + " está ocioso e aguardando nova mensagem");
    }

    private Boolean canPerform() {
        return this.mailbox.isAnyItemOnQueue();
    }

    private void upload(String message) {
        System.out.println("ENVIANDO      ->       " + message + " em envio - Consumer " + identifier);
    }

    private void beforePerform() {
        while(this.cantPerform()) {
            if(this.wasPerforming())
                this.onIdle();
            this.onStandBy = Boolean.TRUE;
            this.mailbox.waitChanges();
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
