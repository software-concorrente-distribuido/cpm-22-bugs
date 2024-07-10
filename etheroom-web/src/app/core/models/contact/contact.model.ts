export class Contact {

    public id: string;
    public phone: string;
    public cellphone: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        phone: string = null,
        cellphone: string = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.phone = phone;
        this.cellphone = cellphone;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}