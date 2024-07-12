import { inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Address } from "../models/address/address.model"
import { Contact } from "../models/contact/contact.model";
import { User } from "../models/user/user.model";
import { Person } from "../models/person/person.model";
import { Convenience } from "../models/hotel/aggregates/convenience.model";
import { TouristSpot } from "../models/hotel/aggregates/tourist-spot.model";
import { Guest } from "../models/booking/aggregates/guest.model";
import { Booking } from "../models/booking/booking.model";
import { Hotel } from "../models/hotel/hotel.model";
import { HotelRoom } from "../models/hotel/aggregates/hotel-room.model";

export const createBookingForm = (booking: Booking = null): FormGroup => {
    const formBuilder: FormBuilder = inject(FormBuilder);
    return formBuilder.group({
        id: [booking?.id],
        hotelRoomId: [booking?.hotelRoomId, [Validators.required]],
        personId: [booking?.personId, [Validators.required]],
        status: [booking?.status, [Validators.required, Validators.maxLength(50)]],
        totalPrice: [booking?.totalPrice],
        numberOfGuests: [booking?.numberOfGuests],
        ethereumTransactionAddress: [booking?.ethereumTransactionAddress, [Validators.maxLength(255)]],
        checkIn: [booking?.checkIn],
        checkOut: [booking?.checkOut],
        guests: formBuilder.array(booking?.guests?.map(guest => createGuestForm(guest))),
        updatedAt: [booking?.updatedAt],
        createdAt: [booking?.createdAt]
    });
}

export const createHotelRoomForm = (hotelRoom: HotelRoom = null): FormGroup => {
    const formBuilder: FormBuilder = inject(FormBuilder);
    return formBuilder.group({
        id: [hotelRoom?.id],
        description: [hotelRoom?.description, [Validators.required, Validators.maxLength(255)]],
        type: [hotelRoom?.type, [Validators.required, Validators.maxLength(100)]],
        price: [hotelRoom?.price, [Validators.required]],
        capacity: [hotelRoom?.capacity, [Validators.required]],
        available: [hotelRoom?.available],
        conveniences: formBuilder.array(hotelRoom?.conveniences?.map(convenience => createConvenienceForm(convenience))),
        hotelId: [hotelRoom?.hotelId, [Validators.required]],
        thumbnail: [hotelRoom?.thumbnail],
        images: [hotelRoom?.images],
        updatedAt: [hotelRoom?.updatedAt],
        createdAt: [hotelRoom?.createdAt]
    });
}

export const createHotelForm = (hotel: Hotel = null): FormGroup => {
    const formBuilder: FormBuilder = inject(FormBuilder);
    return inject(FormBuilder).group({
        id: [hotel?.id],
        name: [hotel?.name, [Validators.required, Validators.maxLength(100)]],
        description: [hotel?.description, [Validators.maxLength(255)]],
        user: createUserForm(hotel?.user),
        address: createAddressForm(hotel?.address),
        thumbnail: [hotel?.thumbnail],
        conveniences: formBuilder.array(hotel?.conveniences?.map(convenience => createConvenienceForm(convenience))),
        images: [hotel?.images],
        touristSpots: formBuilder.array(hotel?.touristSpots?.map(touristSpot => createTouristSpotForm(touristSpot))),
        updatedAt: [hotel?.updatedAt],
        createdAt: [hotel?.createdAt]
    });
}

export const createPersonForm = (person: Person = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [person?.id],
        name: [person?.name, [Validators.required, Validators.maxLength(100)]],
        user: createUserForm(person?.user),
        address: createAddressForm(person?.address),
        contact: createContactForm(person?.contact),
        updatedAt: [person?.updatedAt],
        createdAt: [person?.createdAt]
    });
}

export const createUserForm = (user: User = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [user?.id],
        ethereumAddress: [user?.ethereumAddress, [Validators.maxLength(255)]],
        ethereumPublicKey: [user?.ethereumPublicKey, [Validators.maxLength(255)]],
        email: [user?.email, [Validators.maxLength(50)]],
        role: [user?.role, [Validators.maxLength(50)]],
        profilePicture: [user?.profilePicture],
        updatedAt: [user?.updatedAt],
        createdAt: [user?.createdAt]
    });
}

export const createContactForm = (contact: Contact = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [contact?.id],
        phone: [contact?.phone, [Validators.maxLength(20)]],
        cellphone: [contact?.cellphone, [Validators.maxLength(20)]],
        updatedAt: [contact?.updatedAt],
        createdAt: [contact?.createdAt]
    });
}

export const createAddressForm = (address: Address = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [address?.id],
        description: [address?.description, [Validators.maxLength(255)]],
        country: [address?.country, [Validators.maxLength(20)]],
        zipCode: [address?.zipCode],
        updatedAt: [address?.updatedAt],
        createdAt: [address?.createdAt]
    });
}

export const createGuestForm = (guest: Guest = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [guest?.id],
        name: [guest?.name, [Validators.required, Validators.maxLength(100)]],
        email: [guest?.email, [Validators.maxLength(50)]],
        phone: [guest?.phone, [Validators.maxLength(20)]],
        updatedAt: [guest?.updatedAt],
        createdAt: [guest?.createdAt]
    });
}

export const createTouristSpotForm = (touristSpot: TouristSpot = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [touristSpot?.id],
        touristSpot: [touristSpot?.touristSpot, [Validators.required, Validators.maxLength(255)]],
        updatedAt: [touristSpot?.updatedAt],
        createdAt: [touristSpot?.createdAt]
    });
}

export const createConvenienceForm = (convenience: Convenience = null): FormGroup => {
    return inject(FormBuilder).group({
        id: [convenience?.id],
        type: [convenience?.type, [Validators.required, Validators.maxLength(100)]],
        updatedAt: [convenience?.updatedAt],
        createdAt: [convenience?.createdAt]
    });
}