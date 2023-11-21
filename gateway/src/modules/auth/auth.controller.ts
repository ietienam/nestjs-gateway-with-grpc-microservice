/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CustomerRegDto,
  UserRoles,
} from './dtos/auth.dto';
import { AuthService } from './auth.service';
import {
  RegisterCustomerRequest,
  ServiceResponse,
} from '../../constants/user.pb';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer/register')
  registerCustomer(
    @Body() body: CustomerRegDto,
  ): Promise<Observable<ServiceResponse>> {
    body.role = UserRoles.CUSTOMER;
    const data: RegisterCustomerRequest = { ...body };
    return this.authService.registerCustomer(data);
  }
}
