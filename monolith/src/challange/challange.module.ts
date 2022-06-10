import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/categories.module';
import { PlayerModule } from '../player/player.module';
import { ChallangeController } from './controllers/challange.controller';
import { ChallengeSchema } from './schemas/challenge.schema';
import { MatchSchema } from './schemas/match.schema';
import { ChallangeService } from './services/challange.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Challenge', schema: ChallengeSchema },
            { name: 'Match', schema: MatchSchema },
        ]),
        PlayerModule,
        CategoryModule,
    ],
    controllers: [ChallangeController],
    providers: [ChallangeService],
})
export class ChallangeModule {}
