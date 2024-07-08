export class EtherRowDefContext<T> {
    public $implicit: any;
    public index: number;

    constructor($implicit: T, index: number) {
        this.$implicit = $implicit;
        this.index = index;
    }
}