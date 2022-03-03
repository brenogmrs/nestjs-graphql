import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { UpdatePlayerDTO } from '../dtos/update-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';
import { PlayerValidationParamsPipe } from '../pipes/player-validation-param.pipe';
import { PlayersService } from '../services/players.service';

@Controller('v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() body: CreatePlayerDTO): Promise<void> {
        await this.playersService.create(body);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Param('id', PlayerValidationParamsPipe) id: string,
        @Body() updateData: UpdatePlayerDTO,
    ): Promise<void> {
        await this.playersService.update(id, updateData);
    }

    @Get()
    async getPlayers(): Promise<PlayerInterface[]> {
        return this.playersService.getAll();
    }

    @Get('/:id')
    async getPlayerById(
        @Param('id', PlayerValidationParamsPipe) id: string,
    ): Promise<PlayerInterface> {
        return this.playersService.getById(id);
    }

    @Delete('/id')
    async deletePlayer(
        @Query('email', PlayerValidationParamsPipe) email: string,
        @Param('id', PlayerValidationParamsPipe) id: string,
    ): Promise<void> {
        await this.playersService.delete(id);
    }
}
