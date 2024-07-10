export class Guest {

    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        name: string = null,
        email: string = null,
        phone: string = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}