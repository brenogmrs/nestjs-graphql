import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateChallengeDTO } from '../dto/create-challenge.dto';
import { ChallengeInterface } from '../interfaces/challenge.interface';
import { ChallangeService } from '../services/challange.service';

@Controller('v1/challenge')
export class ChallangeController {
    constructor(private readonly challengeService: ChallangeService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createChallenge(
        @Body() challengeData: CreateChallengeDTO,
    ): Promise<ChallengeInterface> {
        return this.challengeService.create(challengeData);
    }

    @Get()
    async getAllChallenges(
        @Query('playerId') playerId: string,
    ): Promise<ChallengeInterface[]> {
        return this.challengeService.getAll(playerId);
    }
}
