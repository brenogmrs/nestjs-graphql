import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
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

    @Get()
    async getAllCategories(): Promise<CategoryInterface[]> {
        return this.categoryService.getAll();
    }

    @Get('/:category')
    async getCategoryById(
        @Param('category') category: string,
    ): Promise<CategoryInterface> {
        return this.categoryService.findByCategory(category);
    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Param('category') category: string,
        @Body() updateData: UpdateCategoryDTO,
    ): Promise<void> {
        await this.categoryService.update(category, updateData);
    }

    @Post('/:category/player/:playerId')
    async assignCategoryToPlayer(@Param() params: string[]): Promise<void> {
        await this.categoryService.assignCategoryToPlayer(params);
    }
}
