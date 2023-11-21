/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { USER_SERVICE_NAME, USER_PACKAGE_NAME } from '../../constants/user.pb';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from 'src/services/cache.service';

@Module({
  imports: [
    CacheModule.register(),
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`,
          package: USER_PACKAGE_NAME,
          protoPath:
            'node_modules/@ietienam/service-protos/dist/src/users/user.proto',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, CacheService],
  exports: [AuthService],
})
export class AuthModule {}
