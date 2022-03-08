import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CategoryInterface } from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryInterface>,
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
        return this.categoryModel.find().exec();
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
}
