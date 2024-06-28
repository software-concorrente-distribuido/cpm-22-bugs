package org.example;

public class Main {
    private static final Integer FIRST_PROCESS_ID = 0;
    private static final Integer FIRST_PROCESS_SLEEP_TIME = 1000;
    private static final Integer SECOND_PROCESS_ID = 1;
    private static final Integer SECOND_PROCESS_SLEEP_TIME = 500;

    public static void main(String[] args) {
        Processes firstTask = new Processes(
                FIRST_PROCESS_ID,
                FIRST_PROCESS_SLEEP_TIME
        );

        Processes secondTask = new Processes(
                SECOND_PROCESS_ID,
                SECOND_PROCESS_SLEEP_TIME
        );

        Thread firstThread = new Thread(firstTask);
        Thread secondThread = new Thread(secondTask);

        firstThread.start();
        secondThread.start();
    }
}