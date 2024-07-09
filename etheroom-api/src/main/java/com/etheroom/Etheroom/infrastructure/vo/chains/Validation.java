package com.etheroom.Etheroom.infrastructure.vo.chains;

public abstract class Validation<T> {

    private Validation<T> next;

    public abstract void validate(T entityToValidate);

    public void setNext(Validation<T> next) {
        this.next = next;
    }

    public Validation<T> getNext() {
        return this.next;
    }

}