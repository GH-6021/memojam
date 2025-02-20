import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('MemoesArchiving')
    .setDescription('The memoes API description')
    .setVersion('1.0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
