package org.example;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Peterson {

    private Integer turn;
    private final Boolean[] flag = new Boolean[2];

    public Peterson() {
        flag[0] = false;
        flag[1] = false;
        turn = 0;
    }

    public synchronized void enterCritical(int processId) {
        int other = 1 - processId;
        flag[processId] = Boolean.TRUE;
        turn = other;
        while (flag[other] && turn == other) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public synchronized void leaveCritical(int processId) {
        flag[processId] = Boolean.FALSE;
        notify();
    }
}
