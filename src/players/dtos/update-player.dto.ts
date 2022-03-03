import { IsString, IsEmail } from 'class-validator';

export class UpdatePlayerDTO {
    @IsString()
    readonly phoneNumber?: string;

    @IsEmail()
    readonly email?: string;

    @IsString()
    readonly name?: string;
}
