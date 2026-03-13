import {
  IsEmail,
  IsEnum, IsObject, IsOptional, IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested
} from 'class-validator';
import { UserRole, UserStatus } from '../enums/user.enums';
import { Type } from 'class-transformer';
import { IsNull, Or } from 'typeorm';

class AddressDTO {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(UserStatus)
  status: UserStatus;

  @ValidateNested()
  @Type(() => AddressDTO)
  @IsObject()
  address: AddressDTO;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  profilePicture: string | null;
}
