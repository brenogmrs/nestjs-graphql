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
import { PlayerService } from '../services/player.service';

@Controller('v1/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() body: CreatePlayerDTO): Promise<void> {
        await this.playerService.create(body);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Param('id', PlayerValidationParamsPipe) id: string,
        @Body() updateData: UpdatePlayerDTO,
    ): Promise<void> {
        await this.playerService.update(id, updateData);
    }

    @Get()
    async getPlayers(): Promise<PlayerInterface[]> {
        return this.playerService.getAll();
    }

    @Get('/:id')
    async getPlayerById(
        @Param('id', PlayerValidationParamsPipe) id: string,
    ): Promise<PlayerInterface> {
        return this.playerService.getById(id);
    }

    @Delete('/id')
    async deletePlayer(
        @Query('email', PlayerValidationParamsPipe) email: string,
        @Param('id', PlayerValidationParamsPipe) id: string,
    ): Promise<void> {
        await this.playerService.delete(id);
    }
}
