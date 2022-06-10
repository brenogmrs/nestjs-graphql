import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
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
}
