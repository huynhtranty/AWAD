import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import express, { Request, Response } from 'express';

const expressApp = express();
let isAppInitialized = false;
let nestApp;

async function bootstrap() {
  if (!isAppInitialized) {
    nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { logger: ['error', 'warn', 'log'] }
    );

    // Enable CORS
    nestApp.enableCors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        /\.vercel\.app$/, // Allow all Vercel deployments
      ],
      credentials: true,
    });

    // Enable global validation
    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await nestApp.init();
    isAppInitialized = true;
  }

  return expressApp;
}

export default async (req: Request, res: Response) => {
  try {
    const app = await bootstrap();
    app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};
