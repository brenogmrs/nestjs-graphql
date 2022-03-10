import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { PlayerInterface } from '../../player/interfaces/player.interface';

export class CreateChallengeDTO {
    @IsNotEmpty()
    @IsDateString()
    challengeDateTime: Date;

    @IsNotEmpty()
    @IsString()
    challenger: PlayerInterface;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<PlayerInterface>;
}
