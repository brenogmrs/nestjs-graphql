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
import { ValidationParamsPipe } from '../../common/pipes/validation-param.pipe';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { UpdatePlayerDTO } from '../dtos/update-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';
import { PlayerService } from '../services/player.service';

@Controller('v1/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() body: CreatePlayerDTO,
    ): Promise<PlayerInterface> {
        return this.playerService.create(body);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Param('id', ValidationParamsPipe) id: string,
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
        @Param('id', ValidationParamsPipe) id: string,
    ): Promise<PlayerInterface> {
        return this.playerService.getById(id);
    }

    @Delete('/id')
    async deletePlayer(
        @Query('email', ValidationParamsPipe) email: string,
        @Param('id', ValidationParamsPipe) id: string,
    ): Promise<void> {
        await this.playerService.delete(id);
    }
}
