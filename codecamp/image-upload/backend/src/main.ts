import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/graphql/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
