export class Media {

    public id: string;
    public filename: string;
    public size: number;
    public type: string;
    public data: string;

    constructor(
        id: string = null,
        filename: string = null,
        size: number = null,
        type: string = null,
        data: string = null
    ) {
        this.id = id;
        this.filename = filename;
        this.size = size;
        this.type = type;
        this.data = data;
    }

}