import { Document } from 'mongoose';
import { PlayerInterface } from '../../player/interfaces/player.interface';
import { ChallengeStatus } from '../enums/challenge-status.enum';

export class ChallengeInterface extends Document {
    challengeDateTime: Date;
    status: ChallengeStatus;
    dateTimeRequest: Date;
    dateTimeResponse: Date;
    challenger: PlayerInterface;
    category: string;
    players: Array<PlayerInterface>;
    match: MatchInterface;
}

export interface MatchInterface extends Document {
    category: string;
    players: Array<PlayerInterface>;
    challenged: PlayerInterface;
    result: Array<MatchResult>;
}

export interface MatchResult {
    set: string;
}
