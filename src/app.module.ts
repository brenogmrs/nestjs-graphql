import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/categories.module';
import { PlayerModule } from './player/player.module';
import { ChallangeModule } from './challange/challange.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(String(process.env.MONGODB_CONN_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        PlayerModule,
        CategoryModule,
        ChallangeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
