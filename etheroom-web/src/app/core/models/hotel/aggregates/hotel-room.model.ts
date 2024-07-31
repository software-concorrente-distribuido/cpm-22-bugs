import { Media } from "../../media/media.model";
import { Convenience } from "./convenience.model";

export class HotelRoom {

    public id: string;
    public description: string;
    public type: string;
    public price: number;
    public number: number;
    public capacity: number;
    public available: boolean;
    public conveniences: Convenience[];
    public hotelId: string;
    public thumbnail: Media;
    public images: Media[];
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        description: string = null,
        type: string = null,
        price: number = null,
        number: number = null,
        capacity: number = null,
        available: boolean = null,
        conveniences: Convenience[] = [],
        hotelId: string = null,
        thumbnail: Media = null,
        images: Media[] = [],
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.price = price;
        this.number = number;
        this.capacity = capacity;
        this.available = available;
        this.conveniences = conveniences;
        this.hotelId = hotelId;
        this.thumbnail = thumbnail;
        this.images = images;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public static buildWithHotelId(hotelId: string): HotelRoom {
        const hotelRoom: HotelRoom = new HotelRoom();
        hotelRoom.hotelId = hotelId;
        return hotelRoom;
    }

}