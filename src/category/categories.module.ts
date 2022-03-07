import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controllers/category.controller';
import { CategorySchema } from './schema/category.schema';
import { CategoryService } from './services/category.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Category', schema: CategorySchema },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
