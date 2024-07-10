export class Convenience {

    public id: string;
    public type: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        type: string = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.type = type;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}