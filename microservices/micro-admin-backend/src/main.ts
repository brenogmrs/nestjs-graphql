import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.SMARTRANKING_MQ_URL],
            queue: process.env.ADMIN_SERVICE_QUEUE,
            noAck: false,
        },
    });

    await app.listen();
}
bootstrap();
