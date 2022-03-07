import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { CategoryInterface } from '../interfaces/category.interface';
import { CategoryService } from '../services/category.service';

@Controller('v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() categoryData: CreateCategoryDTO,
    ): Promise<CategoryInterface> {
        return this.categoryService.create(categoryData);
    }
}
