import { Address } from "../address/address.model";
import { Media } from "../media/media.model";
import { User } from "../user/user.model";
import { Convenience } from "./aggregates/convenience.model";
import { TouristSpot } from "./aggregates/tourist-spot.model";

export class Hotel {

    public id: string;
    public name: string;
    public description: string;
    public user: User;
    public address: Address;
    public thumbnail: Media;
    public conveniences: Convenience[];
    public images: Media[];
    public touristSpots: TouristSpot[];
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        name: string = null,
        description: string = null,
        user: User = null,
        address: Address = null,
        thumbnail: Media = null,
        conveniences: Convenience[] = [],
        images: Media[] = [],
        touristSpots: TouristSpot[] = [],
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.user = user;
        this.address = address;
        this.thumbnail = thumbnail;
        this.conveniences = conveniences;
        this.images = images;
        this.touristSpots = touristSpots;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public static fromUser(user: User): Hotel {
        const hotel: Hotel = new Hotel();
        hotel.user = user;
        return hotel;
    }

}