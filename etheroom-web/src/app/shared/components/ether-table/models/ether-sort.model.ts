export class EtherSort {
    active: string;
    direction: string;
    
    constructor(column: string, direction: string) {
        this.active = column;
        this.direction = direction;
    }

    public buildSort(): string {
        return `${this.active}, ${this.direction}`;
    }
}