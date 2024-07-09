import { Observable, Subject } from "rxjs";

export class EtherDataSource<T> {
    public initialData: T[];
    public filteredData: T[];
    public change: Subject<any> = new Subject();

    public constructor(data: T[]) {
        this.initialData = data;
        this.filteredData = this.initialData;
    }

    public get data(): T[] {
        return this.filteredData || [];
    }
    
    public set data(data: T[]) {
        this.initialData = data;
        this.filteredData = this.initialData;
        this.change.next(data);
    }

    public onChanges() {
        return this.change.asObservable();
    }

    // public filterData(filter: (value: any) => unknown): void {
    //     this.filteredData = this.initialData.filter(filter);
    //     this.change.next(filter);
    // }

    // public predicateData(predicate: (value: any) => unknown): void {
    //     this.filteredData = this.initialData.filter(predicate);
    //     this.change.next(predicate);
    // }


}
