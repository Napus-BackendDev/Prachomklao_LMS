import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(CookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();