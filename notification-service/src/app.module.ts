import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumersModule } from './consumers/consumers.module';
import { ProducersModule } from './producers/producers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ConsumersModule,
    ProducersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
