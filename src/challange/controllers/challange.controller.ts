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
import { AssignMatchToChallengeDTO } from '../dto/assign-match-to-challenge.dto';
import { CreateChallengeDTO } from '../dto/create-challenge.dto';
import { UpdatePlayerDTO } from '../dto/update-challenge.dto';
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

    @Post('/:challengeId/match/')
    async assignMatchToChallenge(
        @Param('challengeId', ValidationParamsPipe) challengeId: string,
        @Body() assignMatchToChallengeDTO: AssignMatchToChallengeDTO,
    ): Promise<ChallengeInterface> {
        return this.challengeService.assignMatchToChallenge(
            challengeId,
            assignMatchToChallengeDTO,
        );
    }

    @Get()
    async getAllChallenges(
        @Query('playerId') playerId: string,
    ): Promise<ChallengeInterface[]> {
        return this.challengeService.getAll(playerId);
    }

    @Put('/:challengeId')
    @UsePipes(ValidationPipe)
    async updateChallenge(
        @Param('challengeId', ValidationParamsPipe) challengeId: string,
        @Body() updateData: UpdatePlayerDTO,
    ): Promise<ChallengeInterface> {
        return this.challengeService.update(challengeId, updateData);
    }

    @Delete('/:challengeId')
    async deleteChallenge(
        @Param('challengeId', ValidationParamsPipe) challengeId: string,
    ): Promise<ChallengeInterface> {
        return this.challengeService.delete(challengeId);
    }
}
