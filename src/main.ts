import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const options = {
    origin: '*',
    headers: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);

  // the next two lines did the trick
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  await app.listen(3000);
}
bootstrap();
