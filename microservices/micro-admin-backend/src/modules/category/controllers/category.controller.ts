import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryInterface } from '../interfaces/category.interface';
import { CategoryService } from '../services/category.service';

@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    private readonly logger = new Logger(CategoryController.name);

    @EventPattern('create-category')
    public async createCategory(@Payload() categoryData: CategoryInterface) {
        this.logger.log(
            `message received at topic:create-category: ${JSON.stringify(
                categoryData,
            )}`,
        );

        return this.categoryService.create(categoryData);
    }

    @MessagePattern('get-categories')
    public async getAllCategories(@Payload() categoryId?: string) {
        this.logger.log(
            `message received at topic:get-categories with ID: ${categoryId}`,
        );

        if (categoryId) {
            return this.categoryService.getCategoryById(categoryId);
        }

        return this.categoryService.getAllCategories();
    }
}
