import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from '../../category/services/category.service';
import { PlayerService } from '../../player/services/player.service';
import { AssignMatchToChallengeDTO } from '../dto/assign-match-to-challenge.dto';
import { CreateChallengeDTO } from '../dto/create-challenge.dto';
import { UpdatePlayerDTO } from '../dto/update-challenge.dto';
import { ChallengeStatus } from '../enums/challenge-status.enum';
import {
    ChallengeInterface,
    MatchInterface,
} from '../interfaces/challenge.interface';
@Injectable()
export class ChallangeService {
    constructor(
        @InjectModel('Challenge')
        private readonly challengeModel: Model<ChallengeInterface>,

        @InjectModel('Match')
        private readonly matchModel: Model<MatchInterface>,

        private readonly playerService: PlayerService,
        private readonly categoryService: CategoryService,
    ) {}

    public async create(
        challengeData: CreateChallengeDTO,
    ): Promise<ChallengeInterface> {
        Promise.all(
            challengeData.players.map(async (player) => {
                await this.playerService.getById(player._id);
            }),
        );

        const isChallengerInPlayers = challengeData.players.find(
            (player) => player._id === challengeData.challenger,
        );

        if (!isChallengerInPlayers) {
            throw new BadRequestException(
                'The challenger is not one of the players in this match',
            );
        }

        const isChallengerInCategory =
            await this.categoryService.getCategoryByPlayerId(
                challengeData.challenger as any,
            );

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

        const player = new this.challengeModel(challengeData);

        Object.assign(player, challengeToCreate);

        return player.save();
    }

    public async getAll(_id: string): Promise<ChallengeInterface[]> {
        if (_id) {
            await this.playerService.getById(_id);

            return this.challengeModel
                .find()
                .where('players')
                .in([_id])
                .populate('players')
                .populate('match')
                .exec();
        }

        return this.challengeModel
            .find()
            .populate('challenger')
            .populate('players')
            .populate('match')
            .exec();
    }

    public async getById(challangeId: string): Promise<ChallengeInterface> {
        const foundChallenge = await this.challengeModel
            .findOne({ _id: challangeId })
            .exec();

        if (!foundChallenge) {
            throw new NotFoundException('Challange not found');
        }

        return foundChallenge;
    }

    public async update(
        challangeId: string,
        updateData: UpdatePlayerDTO,
    ): Promise<ChallengeInterface> {
        await this.getById(challangeId);

        return this.challengeModel
            .findOneAndUpdate(
                {
                    _id: challangeId,
                },
                { $set: updateData },
            )
            .exec();
    }

    public async delete(challangeId: string): Promise<ChallengeInterface> {
        await this.getById(challangeId);

        return this.challengeModel
            .findOneAndUpdate(
                {
                    _id: challangeId,
                },
                { $set: { status: ChallengeStatus.CANCELED } },
            )
            .exec();
    }

    public async assignMatchToChallenge(
        challangeId: string,
        assignMatchToChallenge: AssignMatchToChallengeDTO,
    ): Promise<ChallengeInterface> {
        const foundChallenge = await this.getById(challangeId);

        const isWinnerInChallenge = foundChallenge.players.find(
            (player) => player._id === assignMatchToChallenge.winner,
        );

        if (!isWinnerInChallenge) {
            throw new BadRequestException(
                'The winner meust be in the challenge',
            );
        }

        const match = new this.matchModel(assignMatchToChallenge);

        Object.assign(match, {
            category: foundChallenge.category,
            players: foundChallenge.players,
        });

        const result = await match.save();

        Object.assign(foundChallenge, {
            status: ChallengeStatus.EXECUTED,
            match: result._id,
        });

        try {
            await this.challengeModel.findOneAndUpdate(
                { _id: challangeId },
                { $set: foundChallenge },
            );
        } catch (error) {
            await this.matchModel.deleteOne({ _id: result._id }).exec();

            throw new InternalServerErrorException();
        }

        return new ChallengeInterface();
    }
}
