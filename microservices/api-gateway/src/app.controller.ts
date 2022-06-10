import {
    Body,
    Controller,
    Logger,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { AdminService } from './services/admin.service';

@Controller('/v1')
export class AppController {
    private logger = new Logger(AppController.name);

    constructor(private readonly adminService: AdminService) {}

    @Post('category')
    @UsePipes(ValidationPipe)
    public async createCategory(@Body() categoryData: CreateCategoryDTO) {
        this.logger.log('AdminService -> topic:create-category');
        return this.adminService.createCategory(categoryData);
    }
}
