import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { PlayerModule } from './modules/player/player.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(String(process.env.MONGODB_CONN_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        CategoryModule,
        PlayerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
