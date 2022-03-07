import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(String(process.env.MONGODB_CONN_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        PlayersModule,
        CategoriesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
