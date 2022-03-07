import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { CategoryInterface } from '../interfaces/category.interface';
import { CategoriesService } from '../services/categories.service';

@Controller('v1/categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() categoryData: CreateCategoryDTO,
    ): Promise<CategoryInterface> {
        return this.categoryService.create(categoryData);
    }
}
