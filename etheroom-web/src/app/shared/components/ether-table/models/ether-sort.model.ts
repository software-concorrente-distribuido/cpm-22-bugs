export class EtherSort {
    column: string;
    direction: string;
    
    constructor(column: string, direction: string) {
        this.column = column;
        this.direction = direction;
    }

    public buildSort(): string {
        return `${this.column}, ${this.direction}`;
    }
}