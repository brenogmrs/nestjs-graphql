import { IsNotEmpty } from 'class-validator';
import { PlayerInterface } from '../../player/interfaces/player.interface';
import { MatchResult } from '../interfaces/challenge.interface';

export class AssignMatchToChallengeDTO {
    @IsNotEmpty()
    winner: PlayerInterface;

    @IsNotEmpty()
    result: Array<MatchResult>;
}
