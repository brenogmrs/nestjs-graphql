import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';
import { PlayersService } from '../services/players.service';

@Controller('v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createOrUpdatePlayer(@Body() body: CreatePlayerDTO): Promise<void> {
        await this.playersService.createOrUpdatePlayer(body);
    }

    @Get()
    async getPlayers(
        @Query('email') email: string,
    ): Promise<PlayerInterface[] | PlayerInterface> {
        if (email) {
            return this.playersService.getByEmail(email);
        }
        return this.playersService.getAll();
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
