import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { rpcExceptionError } from '../../common/helpers/errors/rcp-exception.helper';
import { CategoryInterface } from '../interfaces/category.interface';

export class CategoryService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryInterface>,
    ) {}

    private readonly logger = new Logger(CategoryService.name);

    public async create(
        categoryData: CategoryInterface,
    ): Promise<CategoryInterface> {
        try {
            const categoryToCreate = new this.categoryModel(categoryData);

            return categoryToCreate.save();
        } catch (error) {
            return rpcExceptionError(this.logger, error);
        }
    }

    public async getAllCategories(): Promise<CategoryInterface[]> {
        try {
            return this.categoryModel.find().exec();
        } catch (error) {
            return rpcExceptionError(this.logger, error);
        }
    }

    public async getCategoryById(
        categoryId: string,
    ): Promise<CategoryInterface> {
        try {
            return this.categoryModel.findOne({ _id: categoryId }).exec();
        } catch (error) {
            return rpcExceptionError(this.logger, error);
        }
    }

    public async update(
        id: string,
        updateData: CategoryInterface,
    ): Promise<void> {
        try {
            await this.categoryModel
                .findOneAndUpdate({ _id: id }, { $set: updateData })
                .exec();
        } catch (error) {
            return rpcExceptionError(this.logger, error);
        }
    }
}
