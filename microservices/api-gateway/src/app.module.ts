import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminService } from './services/admin.service';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AdminService],
})
export class AppModule {}
