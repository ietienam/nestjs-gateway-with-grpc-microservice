/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export enum UserRoles {
  CUSTOMER = 'CUSTOMER',
  ORGANIZATION = 'ORG',
  RESTUARANT = 'RESTUARANT',
}

export enum StaffRoles {
  MANAGER = 'MANAGER',
  KITCHEN = 'KITCHEN'
}

export enum RolesForInvite {
  ORGANIZATION = 'ORG',
  MANAGER = 'MANAGER',
  KITCHEN = 'KITCHEN'
}

export class BaseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: UserRoles | StaffRoles;
}

export class CustomerRegDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}

export class OrgRegDto {
  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty() //TODO: more security on password validation
  password: string;

}