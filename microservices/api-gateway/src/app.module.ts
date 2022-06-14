import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './controllers/category.controller';
import { TimeoutInterceptor } from './interceptors/timout.interceptor';
import { CategoryService } from './services/category.service';
@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [CategoryController],
    providers: [CategoryService, TimeoutInterceptor],
})
export class AppModule {}
