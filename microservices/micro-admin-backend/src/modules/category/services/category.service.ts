import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
            this.logger.error(`ERROR: ${JSON.stringify(error)}`);
            throw new RpcException(error.message);
        }
    }
}
