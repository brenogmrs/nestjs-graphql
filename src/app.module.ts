import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(String(process.env.MONGODB_CONN_STRING)),
        PlayersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
