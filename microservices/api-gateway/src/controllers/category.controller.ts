import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CategoryService } from '../services/category.service';

@Controller('/v1/category')
export class CategoryController {
    private logger = new Logger(CategoryController.name);

    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public createCategory(@Body() categoryData: CreateCategoryDTO) {
        this.logger.log('AdminService -> topic:create-category');
        this.categoryService.createCategory(categoryData);
    }

    @Get()
    public findCategories(
        @Query('categoryId') categoryId?: string,
    ): Observable<any> {
        this.logger.log('AdminService -> topic:get-categories');
        return this.categoryService.findCategories(categoryId);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Param('id') id: string,
        @Body() updateData: UpdateCategoryDTO,
    ): Promise<void> {
        this.logger.log('AdminService -> topic:update-category');
        this.categoryService.update(id, updateData);
    }
}
