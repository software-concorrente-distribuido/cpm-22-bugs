import { HotelRoom } from "../hotel/aggregates/hotel-room.model";
import { Hotel } from "../hotel/hotel.model";
import { Guest } from "./aggregates/guest.model";

export class Booking {

    public id: string;
    public hotelRoomId: string;
    public hotelRoom?: HotelRoom;
    public hotel?: Hotel;
    public personId: string;
    public status: string;
    public totalPrice: number;
    public numberOfGuests: number;
    public ethereumTransactionAddress: string;
    public checkIn: Date;
    public checkOut: Date;
    public guests: Guest[];
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        hotelRoomId: string = null,
        personId: string = null,
        status: string = null,
        totalPrice: number = null,
        numberOfGuests: number = null,
        ethereumTransactionAddress: string = null,
        checkIn: Date = null,
        checkOut: Date = null,
        guests: Guest[] = [],
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.hotelRoomId = hotelRoomId;
        this.personId = personId;
        this.status = status;
        this.totalPrice = totalPrice;
        this.numberOfGuests = numberOfGuests;
        this.ethereumTransactionAddress = ethereumTransactionAddress;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.guests = guests;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}