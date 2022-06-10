import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from '../player/player.module';
import { CategoryController } from './controllers/category.controller';
import { CategorySchema } from './schemas/category.schema';
import { CategoryService } from './services/category.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Category', schema: CategorySchema },
        ]),
        PlayerModule,
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
