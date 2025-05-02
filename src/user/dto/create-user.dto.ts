import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsUrl,
  MinLength,
  IsIn,
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
    example: 'photo.jpg',
    description: 'URL to the user\'s profile photo',
  })
  photo: string;
}

export class CreateAdminDto {
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
    example: Roles.ADMIN,
    description: 'Role of the user (ADMIN, SUPER-ADMIN)',
  })
  @IsIn(["ADMIN", "SUPER-ADMIN"])
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
    example: 'photo.jpg',
    description: 'Photo to the user\'s profile photo',
  })
  @IsString()
  photo: string;
}
