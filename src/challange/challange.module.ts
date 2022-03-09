import { Module } from '@nestjs/common';
import { ChallangeController } from './controllers/challange.controller';
import { ChallangeService } from './services/challange.service';

@Module({
    controllers: [ChallangeController],
    providers: [ChallangeService],
})
export class ChallangeModule {}
