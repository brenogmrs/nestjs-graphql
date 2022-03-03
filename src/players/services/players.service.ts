import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO, UpdatePlayerDTO } from '../dtos/create-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';

@Injectable()
export class PlayersService {
    constructor(
        @InjectModel('Player')
        private readonly playerModel: Model<PlayerInterface>,
    ) {}

    public async createOrUpdatePlayer(
        playerData: CreatePlayerDTO,
    ): Promise<void> {
        const { email } = playerData;

        const foundPlayer = await this.playerModel.findOne({ email }).exec();

        if (foundPlayer) {
            await this.update(playerData);
        } else {
            await this.create(playerData);
        }
    }

    public async getAll(): Promise<PlayerInterface[]> {
        return this.playerModel.find().exec();
    }

    private async create(
        playerData: CreatePlayerDTO,
    ): Promise<PlayerInterface> {
        const player = new this.playerModel(playerData);

        return player.save();
    }

    private async update(
        updateData: UpdatePlayerDTO,
    ): Promise<PlayerInterface> {
        return this.playerModel
            .findOneAndUpdate({ email: updateData.email }, { $set: updateData })
            .exec();
    }

    public async getByEmail(email: string): Promise<PlayerInterface> {
        const foundPlayer = await this.playerModel.findOne({ email }).exec();

        if (!foundPlayer) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }

        return foundPlayer;
    }

    public async deletePlayer(email: string): Promise<void> {
        await this.playerModel.deleteOne({ email }).exec();
    }
}
