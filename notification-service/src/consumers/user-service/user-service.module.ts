import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailModule } from '../email/email.module';
import { USER_SERVICE_QUEUE, USER_SERVICE_EXCHANGE } from './constants';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_EXCHANGE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: USER_SERVICE_QUEUE,
          noAck: false,
          prefetchCount: 100000,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    EmailModule,
  ],
  providers: [UserServiceService],
})
export class UserServiceModule {}
