import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AppModule {}
