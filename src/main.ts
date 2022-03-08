import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptions } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptions());

    app.setGlobalPrefix('api');
    await app.listen(8080);
}
bootstrap();
