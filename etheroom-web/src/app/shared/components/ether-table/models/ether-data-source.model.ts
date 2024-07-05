export class EtherDataSource<T> {
    public initialData;
    public filteredData;
    // public onChange;

    public constructor(data: T[]) {
        this.initialData = data;
        this.filteredData = this.initialData;
    }


}
