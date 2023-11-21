/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRoles } from './dtos/auth.dto';

@Injectable()
export class UserAuthGuard implements CanActivate {

    constructor(private readonly role: string) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) throw new UnauthorizedException('Unauthorized request');
    req.token = bearerHeader.split(' ')[1];
    req.body.userProfile = jwt.verify(
      req.token,
      process.env.JWT_SECRET_KEY,
      (err, tokenData) => {
        if (err) {
          throw new InternalServerErrorException(
            err.message || 'Token not verified',
          );
        }
        return tokenData;
      },
    );

    console.log(req?.body?.userProfile);
    if(req?.body?.userProfile?.role !== this.role) throw new ForbiddenException("You have no permission to this resource");
    
    return true;
  }
}
