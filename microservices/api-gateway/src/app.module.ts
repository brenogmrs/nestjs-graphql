import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './controllers/admin.controller';
import { TimeoutInterceptor } from './interceptors/timout.interceptor';
import { AdminService } from './services/admin.service';
@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AdminController],
    providers: [AdminService, TimeoutInterceptor],
})
export class AppModule {}
