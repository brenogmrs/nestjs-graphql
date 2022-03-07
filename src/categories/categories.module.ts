import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './controllers/categories.controller';
import { CategorySchema } from './schema/category.schema';
import { CategoriesService } from './services/categories.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Category', schema: CategorySchema },
        ]),
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
