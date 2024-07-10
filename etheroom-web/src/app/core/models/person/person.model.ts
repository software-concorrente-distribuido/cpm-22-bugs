import { Address } from "../address/address.model";
import { Contact } from "../contact/contact.model";
import { User } from "../user/user.model";

export class Person {

    public id: string;
    public name: string;
    public user: User;
    public address: Address;
    public contact: Contact;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        name: string = null,
        user: User = null,
        address: Address = null,
        contact: Contact = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.address = address;
        this.contact = contact;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

}