export class TouristSpot {

    public id: string;
    public touristSpot: string;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        touristSpot: string = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.touristSpot = touristSpot;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}