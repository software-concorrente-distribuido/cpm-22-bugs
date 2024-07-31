export type Enum = {
    name: string;
    description: string;
}

export type ApplicationError = {
    error: any | EtheroomApplicationError;
}

export type EtheroomApplicationError = {
    title: string;
    status: number;
    details: string;
    developerMessage: string;
    className: string;
    timestamp: Date;
}

export type AuthenticationRequest = {
    ethereumAddress: string;
    ethereumPublicKey: string;
}

export type AuthenticationResponse = {
    accessToken: string;
}

export type Token = {
    token: string;
    hash: string;
    type: string;
}

export type JwtTokenClaims = {
    sub: string;
    role: string;
    iat: number;
    exp: number;
    id: string;
}

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export type EthereumAccount = {
    account: string;
    secret: string;
}

export type Availability = {
    checkIn: Date;
    checkOut: Date;
    hotelRoomId: string;
}