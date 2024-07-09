package org.example;

public class Processes implements Runnable {

    private final Integer processId;
    private final Integer timeToSleep;
    
    private static final Peterson peterson = new Peterson();

    public Processes(Integer processId, Integer timeToSleep) {
        this.processId = processId;
        this.timeToSleep = timeToSleep;
    }

    @Override
    public void run() {
        while (true) {
            peterson.enterCritical(processId);
            System.out.println("Process " + processId + " is in critical section");
            try {
                Thread.sleep(timeToSleep);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            peterson.leaveCritical(processId);
        }
    }
}
