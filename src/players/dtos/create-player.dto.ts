import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreatePlayerDTO {
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly name: string;
}

export class UpdatePlayerDTO {
    @IsString()
    readonly phoneNumber?: string;

    @IsString()
    readonly email?: string;

    @IsString()
    readonly name?: string;
}
