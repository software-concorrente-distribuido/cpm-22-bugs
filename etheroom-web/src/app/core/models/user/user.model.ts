import { EthereumAccount } from "../../types/types";
import { Media } from "../media/media.model";

export class User {

    public id: string;
    public ethereumAddress: string;
    public ethereumPublicKey: string;
    public email: string;
    public role: string;
    public profilePicture: Media;
    public updatedAt: Date;
    public createdAt: Date;

    constructor(
        id: string = null,
        ethereumAddress: string = null,
        ethereumPublicKey: string = null,
        email: string = null,
        role: string = null,
        profilePicture: Media = null,
        updatedAt: Date = null,
        createdAt: Date = null
    ) {
        this.id = id;
        this.ethereumAddress = ethereumAddress;
        this.ethereumPublicKey = ethereumPublicKey;
        this.email = email;
        this.role = role;
        this.profilePicture = profilePicture;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public static fromEthereumAccount(ethereumAccount: EthereumAccount): User {
        const user: User = new User();
        user.ethereumAddress = ethereumAccount.account;
        user.ethereumPublicKey = ethereumAccount.secret;
        return user;
    }

}