import { Document } from 'mongoose';
import { PlayerInterface } from '../player/player.interface';

export interface CategoryInterface extends Document {
    readonly category: string;
    description: string;
    events: Array<Event>;
    players: Array<PlayerInterface> | any;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}
