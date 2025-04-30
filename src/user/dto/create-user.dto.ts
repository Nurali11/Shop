import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User\'s email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: Roles,
    example: Roles.USER,
    description: 'Role of the user (ADMIN, SUPER_ADMIN, USER)',
  })
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    example: 1,
    description: 'ID of the region the user belongs to',
  })
  @IsInt()
  regionId: number;

  @ApiProperty({
    example: '2001',
    description: 'Year of birth (as a string)',
  })
  @IsString()
  year: string;

  @ApiProperty({
    example: 'hello',
    description: 'Password (minimum 3 characters)',
  })
  @IsString()
  @MinLength(3)
  password: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'URL to the user\'s profile photo',
  })
  @IsUrl()
  photo: string;
}
