import { Document } from 'mongoose';
import { PlayerInterface } from '../../players/interfaces/player.interface';

export interface CategoryInterface extends Document {
    readonly category: string;
    description: string;
    events: Array<Event>;
    players: Array<PlayerInterface>;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}
