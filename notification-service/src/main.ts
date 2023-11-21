import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.NOTIFICATION_SERVICE_PORT) || 3000;
  const logger = new Logger();
  await app.listen(port);
  logger.log('Notification service running');
}
bootstrap();
