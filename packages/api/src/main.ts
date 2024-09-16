import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { testFc, } from 'shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(testFc)
  await app.listen(3000);
}
bootstrap();
