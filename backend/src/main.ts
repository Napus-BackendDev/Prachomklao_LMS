// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// import * as CookieParser from 'cookie-parser';
// async function bootstrap() {
//   dotenv.config();
//   const app = await NestFactory.create(AppModule)
//   app.setGlobalPrefix('api');
//   app.useGlobalPipes(new ValidationPipe());
//   app.use(CookieParser());
//   app.enableCors();
//   await app.listen(process.env.PORT ?? 3000);

// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as functions from 'firebase-functions';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

dotenv.config();

const server = express();

async function createNestApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors();
  await app.init(); // important: init app without listen()
}

createNestApp();

export const api = functions.https.onRequest(server);
