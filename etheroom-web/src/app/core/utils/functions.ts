export class Functions {

    public static acceptTrueOrElse(
        value: boolean, onTrue: () => void, onFalse: () => void
    ): void {
        value ? onTrue() : onFalse();
    }

    public static acceptFalse(
        value: boolean, onFalse: () => void
    ): void {
        !value && onFalse();
    }

}