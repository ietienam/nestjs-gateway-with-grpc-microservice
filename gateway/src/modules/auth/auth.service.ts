/* eslint-disable prettier/prettier */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  UserServiceClient,
  USER_SERVICE_NAME,
  RegisterCustomerRequest,
  ServiceResponse,
} from '../../constants/user.pb';
import { CacheService } from 'src/services/cache.service';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private readonly cacheService: CacheService) {}

  private userService: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  public async registerCustomer(
    request: RegisterCustomerRequest,
  ): Promise<Observable<ServiceResponse>> {
    return this.userService.registerCustomer(request);
  }
}