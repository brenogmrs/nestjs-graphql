import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePlayerDTO, UpdatePlayerDTO } from './dtos/create-player.dto';
import { PlayerInterface } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    private players: PlayerInterface[] = [];

    private readonly logger = new Logger(PlayersService.name);

    public async createOrUpdatePlayer(
        playerData: CreatePlayerDTO,
    ): Promise<void> {
        const { email } = playerData;

        const foundPlayer = this.players.find(
            (player) => player.email === email,
        );

        if (foundPlayer) {
            await this.update(foundPlayer, playerData);
        } else {
            await this.create(playerData);
        }
    }

    public async getAll(): Promise<PlayerInterface[]> {
        return this.players;
    }

    private async create(playerData: CreatePlayerDTO): Promise<void> {
        const { email, name, phoneNumber } = playerData;

        const player: any = {
            _id: uuid(),
            name,
            email,
            phoneNumber,
            ranking: 'A',
            rankingPosition: 1,
            photoUrl: 'google.com/foto123.jpg',
        };

        this.logger.log(`create or update player, ${JSON.stringify(player)}`);

        this.players.push(player);
    }

    private async update(
        player: PlayerInterface,
        updateData: UpdatePlayerDTO,
    ): Promise<void> {
        const { name } = updateData;

        player.name = name;
    }

    public async getByEmail(email: string): Promise<PlayerInterface> {
        const foundPlayer = this.players.find(
            (player) => player.email === email,
        );

        if (!foundPlayer) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }

        return foundPlayer;
    }

    public async deletePlayer(email: string): Promise<void> {
        const foundPlayerIndex = this.players.findIndex(
            (player) => player.email === email,
        );

        if (foundPlayerIndex < 0) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }

        this.players.splice(foundPlayerIndex, 1);
    }
}
