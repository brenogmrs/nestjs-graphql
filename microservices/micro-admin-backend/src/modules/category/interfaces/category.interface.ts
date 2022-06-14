import { Document } from 'mongoose';
import { PlayerInterface } from '../../player/interfaces/player.interface';

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

export interface CategoryUpdateInterface {
    id: string;
    category: CategoryInterface;
}
