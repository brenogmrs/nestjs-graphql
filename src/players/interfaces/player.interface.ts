import { Document } from 'mongoose';

export interface PlayerInterface extends Document {
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    photoUrl: string;
}
