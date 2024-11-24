import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './AppModule';
import { ExceptionsFilter } from './utils/exceptions/ExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, });

  app.use(cookieParser());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
