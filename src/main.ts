import bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RenderModule } from 'nest-next';
import Next from 'next';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const next = Next({
    dir: './',
    dev: process.env.NODE_ENV !== 'production',
  });
  await next.prepare();

  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  useSwagger(app);

  const renderer = app.get(RenderModule);
  renderer.register(app, next);

  await app.listen(3000);
}

function useSwagger(app: INestApplication) {
  const options = new DocumentBuilder().setTitle('ApiHub').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
