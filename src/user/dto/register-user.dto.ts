import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterEmail {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User\'s email address',
  })
  @IsEmail()
  email: string;
}

export class VerifyEmail {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User\'s email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345',
    description: 'Verification code (OTP) sent to the email address',
  })
  @IsString()
  @Length(5, 5, { message: 'The OTP must be exactly 5 characters long' })
  otp: string;
}
