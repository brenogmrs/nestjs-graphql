import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayerInterface } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    private players: PlayerInterface[] = [];

    private readonly logger = new Logger(PlayersService.name);

    public async createOrUpdatePlayer(
        playerData: CreatePlayerDTO,
    ): Promise<void> {
        this.logger.log(`create or update player, ${playerData}`);

        this.create(playerData);
    }

    private create(playerData: CreatePlayerDTO): void {
        const { email, name, phoneNumber } = playerData;

        const player: PlayerInterface = {
            _id: uuid(),
            name,
            email,
            phoneNumber,
            ranking: 'A',
            rankingPosition: 1,
            photo_url: 'google.com/foto123.jpg',
        };

        this.logger.log(`create or update player, ${JSON.stringify(player)}`);

        this.players.push(player);
    }
}
