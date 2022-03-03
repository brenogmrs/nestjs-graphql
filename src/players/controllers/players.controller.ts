import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';
import { PlayerValidationParamsPipe } from '../pipes/player-validation-param.pipe';
import { PlayersService } from '../services/players.service';

@Controller('v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrUpdatePlayer(@Body() body: CreatePlayerDTO): Promise<void> {
        await this.playersService.createOrUpdatePlayer(body);
    }

    @Get()
    async getPlayers(
        @Query('email', PlayerValidationParamsPipe) email: string,
    ): Promise<PlayerInterface[] | PlayerInterface> {
        if (email) {
            return this.playersService.getByEmail(email);
        }
        return this.playersService.getAll();
    }

    @Delete()
    async deletePlayer(
        @Query('email', PlayerValidationParamsPipe) email: string,
    ): Promise<void> {
        await this.playersService.deletePlayer(email);
    }
}
