import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from '../../category/services/category.service';
import { PlayerService } from '../../player/services/player.service';
import { CreateChallengeDTO } from '../dto/create-challenge.dto';
import { ChallengeStatus } from '../enums/challenge-status.enum';
import { ChallengeInterface } from '../interfaces/challenge.interface';
@Injectable()
export class ChallangeService {
    constructor(
        @InjectModel('Challenge')
        private readonly challengeModel: Model<ChallengeInterface>,

        private readonly playerService: PlayerService,
        private readonly categoryService: CategoryService,
    ) {}

    public async create(
        challengeData: CreateChallengeDTO,
    ): Promise<ChallengeInterface> {
        const { challengerId, playersIds } = challengeData;

        Promise.all(
            playersIds.map(async (playerId: string) => {
                await this.playerService.getById(playerId);
            }),
        );

        const isChallengerInPlayers = playersIds.find(
            (playerId) => playerId === challengerId,
        );

        if (!isChallengerInPlayers) {
            throw new BadRequestException(
                'The challenger is not one of the players in this match',
            );
        }

        const isChallengerInCategory =
            await this.categoryService.getCategoryByPlayerId(challengerId);

        if (!isChallengerInCategory) {
            throw new BadRequestException(
                'The challenger must be in a category',
            );
        }

        const challengeToCreate = {
            challengeDateTime: new Date(),
            category: isChallengerInCategory.category,
            status: ChallengeStatus.PENDING,
        };

        const player = new this.challengeModel(challengeToCreate);

        return player.save();
    }
}
