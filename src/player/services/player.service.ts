import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDTO } from '../dtos/create-player.dto';
import { UpdatePlayerDTO } from '../dtos/update-player.dto';
import { PlayerInterface } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel('Player')
        private readonly playerModel: Model<PlayerInterface>,
    ) {}

    public async create(playerData: CreatePlayerDTO): Promise<PlayerInterface> {
        const { email } = playerData;

        const foundPlayer = await this.playerModel.findOne({ email }).exec();

        if (foundPlayer) {
            throw new NotFoundException(
                `Player with this email already exists`,
            );
        }

        const player = new this.playerModel(playerData);

        return player.save();
    }

    public async getAll(): Promise<PlayerInterface[]> {
        return this.playerModel.find().exec();
    }

    public async getById(id: string): Promise<PlayerInterface> {
        const foundPlayer = await this.playerModel.findOne({ _id: id }).exec();

        if (!foundPlayer) {
            throw new NotFoundException(`Player not found`);
        }

        return foundPlayer;
    }

    public async update(
        id: string,
        updateData: UpdatePlayerDTO,
    ): Promise<void> {
        await this.getById(id);

        await this.playerModel
            .findOneAndUpdate({ _id: id }, { $set: updateData })
            .exec();
    }

    public async delete(id: string): Promise<void> {
        await this.getById(id);

        await this.playerModel.deleteOne({ _id: id }).exec();
    }
}
