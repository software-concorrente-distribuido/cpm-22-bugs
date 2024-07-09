package parte1;

import java.util.stream.IntStream;

public class App {

    public static void main(String[] args) {

        Mailbox mailbox = new Mailbox();

        new Producer(1, mailbox, 1000L).start();
        new Consumer(1, mailbox, 1000L).start();

        new Thread(() ->
            IntStream.range(2, 10)
                    .forEach(i -> {
                        new Producer(i, mailbox, 1000L).start();
                        new Consumer(i, mailbox, 1000L).start();
                    })
        ).start();

    }

}
