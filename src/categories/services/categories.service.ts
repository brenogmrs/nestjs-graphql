import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { CategoryInterface } from '../interfaces/category.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryInterface>,
    ) {}

    public async create(
        categoryData: CreateCategoryDTO,
    ): Promise<CategoryInterface> {
        await this.findByCategory(categoryData.category);

        const categoryToCreate = new this.categoryModel(categoryData);

        return categoryToCreate.save();
    }

    public async findByCategory(category: string) {
        const foundCategory = await this.categoryModel
            .findOne({ category })
            .exec();

        if (foundCategory) {
            throw new NotFoundException('Category already exists');
        }
    }
}
