import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:4200'],
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsOptions,
    logger: console,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
