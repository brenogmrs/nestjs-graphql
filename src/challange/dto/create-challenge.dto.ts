import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateChallengeDTO {
    @IsNotEmpty()
    @IsDateString()
    challengeDateTime: Date;

    @IsNotEmpty()
    @IsString()
    challengerId: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    playersIds: Array<string>;
}
