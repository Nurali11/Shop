import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User\'s email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hello',
    description: 'User\'s password (minimum 3 characters)',
  })
  @IsString()
  @MinLength(3)
  password: string;
}
