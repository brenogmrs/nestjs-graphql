export class CreatePlayerDTO {
    readonly phoneNumber: string;
    readonly email: string;
    readonly name: string;
}

export class UpdatePlayerDTO {
    readonly phoneNumber?: string;
    readonly email?: string;
    readonly name?: string;
}
