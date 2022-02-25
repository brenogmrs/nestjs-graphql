import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createOrUpdatePlayer(@Body() body: CreatePlayerDTO) {
        await this.playersService.createOrUpdatePlayer(body);
    }
}
