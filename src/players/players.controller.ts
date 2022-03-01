import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayerInterface } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createOrUpdatePlayer(@Body() body: CreatePlayerDTO): Promise<void> {
        await this.playersService.createOrUpdatePlayer(body);
    }

    @Get()
    async getPlayers(): Promise<PlayerInterface[]> {
        return this.playersService.getAll();
    }
}
