import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallangeController } from './controllers/challange.controller';
import { ChallengeSchema } from './schemas/challenge.schema';
import { ChallangeService } from './services/challange.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Challenge', schema: ChallengeSchema },
        ]),
    ],
    controllers: [ChallangeController],
    providers: [ChallangeService],
})
export class ChallangeModule {}
