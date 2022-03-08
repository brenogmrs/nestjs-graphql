import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './controllers/player.controller';
import { PlayerSchema } from './schemas/player.schema';
import { PlayerService } from './services/player.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    ],
    controllers: [PlayerController],
    providers: [PlayerService],
    exports: [PlayerService],
})
export class PlayerModule {}
