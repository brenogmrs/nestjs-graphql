import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCategoryDTO } from '../dtos/create-category.dto';
import { AdminService } from '../services/admin.service';

@Controller('/v1')
export class AdminController {
    private logger = new Logger(AdminController.name);

    constructor(private readonly adminService: AdminService) {}

    @Post('category')
    @UsePipes(ValidationPipe)
    public createCategory(@Body() categoryData: CreateCategoryDTO) {
        this.logger.log('AdminService -> topic:create-category');
        this.adminService.createCategory(categoryData);
    }

    @Get('category')
    public findCategories(
        @Query('categoryId') categoryId?: string,
    ): Observable<any> {
        this.logger.log('AdminService -> topic:get-categories');
        return this.adminService.findCategories(categoryId);
    }
}
