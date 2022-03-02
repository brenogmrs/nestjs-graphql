import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { PlayerSchema } from './schemas/player.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
