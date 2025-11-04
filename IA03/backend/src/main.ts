import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://awad-04-gmow99hel-hytatys-projects.vercel.app',
      'https://ia-03-hytatys-projects.vercel.app',
      /\.vercel\.app$/, // Allow all Vercel preview deployments
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

  // await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
