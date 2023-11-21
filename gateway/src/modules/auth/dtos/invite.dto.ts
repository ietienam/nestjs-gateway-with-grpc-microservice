/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesForInvite } from './auth.dto';

export class InviteDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(RolesForInvite)
  role: RolesForInvite;

  restaurantId: any;

  orgId: string;
}