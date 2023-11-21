import { Module } from '@nestjs/common';
import { UserServiceModule } from './user-service/user-service.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserServiceModule, EmailModule],
})
export class ConsumersModule {}
