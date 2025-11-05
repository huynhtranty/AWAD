import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import express from 'express';

const server = express();

export default async (req, res) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      /\.vercel\.app$/, // Allow all Vercel deployments
    ],
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  return server(req, res);
};
