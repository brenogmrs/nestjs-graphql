import { IsString } from 'class-validator';

export class UpdatePlayerDTO {
    @IsString()
    readonly phoneNumber?: string;

    @IsString()
    readonly name?: string;
}
