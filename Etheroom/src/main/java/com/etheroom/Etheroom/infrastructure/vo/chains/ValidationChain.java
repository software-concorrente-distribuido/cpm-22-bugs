package com.etheroom.Etheroom.infrastructure.vo.chains;

import com.etheroom.Etheroom.infrastructure.utils.Functions;

import java.util.Arrays;
import java.util.Optional;

public abstract class ValidationChain<T> {

    private T entityToValidate;

    private Validation<T> startsWith;

    @SafeVarargs
    protected final void buildValidationChain(Validation<T>... validations) {
        Arrays.stream(validations)
                .reduce((v1, v2) -> {
                    Functions.acceptTrue(
                            Optional.ofNullable(this.startsWith).isEmpty(),
                            () -> this.startsWith = v1
                    );
                    v1.setNext(v2);
                    return v2;
                });
    }

    public void performValidations(T entityToValidate) {
        this.entityToValidate = entityToValidate;
        Optional.ofNullable(this.startsWith)
                .ifPresent(this::performValidation);
    }

    private void performValidation(Validation<T> validation) {
        validation.validate(this.entityToValidate);
        Optional.ofNullable(validation.getNext())
                .ifPresent(this::performValidation);
    }

}
