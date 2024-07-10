export class Address {

    public id: string;
    public description: string;
    public country: string;
    public zipCode: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null, 
        description: string = null, 
        country: string = null, 
        zipCode: string = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.description = description;
        this.country = country;
        this.zipCode = zipCode;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}