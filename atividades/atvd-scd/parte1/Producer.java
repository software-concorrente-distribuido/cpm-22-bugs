package parte1;

import java.util.Random;

public class Producer extends Thread {

    private static final Double PERFORM_DURATION_VARIATION = 0.1;
    private static final Boolean DEFAULT_STANDBY_VALUE = Boolean.FALSE;

    private final Long performDuration;
    private Boolean onStandBy;

    protected final Integer identifier;
    protected final Mailbox mailbox;

    protected Producer(Integer identifier, Mailbox mailbox, Long performDuration) {
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
        String message = "Mensagem " + new Random().nextInt(1000) + 1;
        this.mailbox.storeMessage(message);
        System.out.println(
                "PROCESSAMENTO ->       " +
                        message
                        + " em processamento "
                        + "- Producer "
                        + this.identifier
        );
    };

    private void onIdle() {
        System.out.println("FILA CHEIA    ->       Fila de Atendimento Cheia - Producer " + this.identifier + " em Standby");
    };

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

    private Boolean canPerform() {
        return this.mailbox != null;
    }

    private Boolean wasPerforming() {
        return !this.onStandBy;
    }

}
