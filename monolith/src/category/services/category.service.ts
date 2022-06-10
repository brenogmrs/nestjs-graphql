import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerInterface } from '../../player/interfaces/player.interface';
import { PlayerService } from '../../player/services/player.service';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CategoryInterface } from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryInterface>,

        private readonly playerService: PlayerService,
    ) {}

    public async create(
        categoryData: CreateCategoryDTO,
    ): Promise<CategoryInterface> {
        const foundCategory = await this.findByCategory(categoryData.category);

        if (foundCategory) {
            throw new ConflictException('Category already exists');
        }

        const categoryToCreate = new this.categoryModel(categoryData);

        return categoryToCreate.save();
    }

    public async findByCategory(category: string): Promise<CategoryInterface> {
        const foundCategory = await this.categoryModel
            .findOne({ category })
            .exec();

        if (!foundCategory) {
            throw new NotFoundException('Category not found');
        }

        return foundCategory;
    }

    public async getAll(): Promise<CategoryInterface[]> {
        return this.categoryModel.find().populate('players').exec();
    }

    public async update(
        category: string,
        updateData: UpdateCategoryDTO,
    ): Promise<void> {
        await this.findByCategory(category);

        await this.categoryModel
            .findOneAndUpdate({ category }, { $set: updateData })
            .exec();
    }

    public async assignCategoryToPlayer(associationData: string[]) {
        const category = associationData['category'];
        const playerId = associationData['playerId'];

        const foundCategory = await this.findByCategory(category);

        const isPlayerInCategory = foundCategory.players.find(
            (player: PlayerInterface) => player._id.toString() === playerId,
        );

        if (isPlayerInCategory) {
            throw new ConflictException(
                'This player already is in this category',
            );
        }

        await this.playerService.getById(playerId);

        foundCategory.players.push(playerId);
        await this.categoryModel
            .findOneAndUpdate({ category }, { $set: foundCategory })
            .exec();
    }

    public async getCategoryByPlayerId(
        playerId: string,
    ): Promise<CategoryInterface> {
        await this.playerService.getById(playerId);

        return this.categoryModel
            .findOne()
            .where('players')
            .in([playerId])
            .exec();
    }
}
