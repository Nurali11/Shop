import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterEmail, VerifyEmail } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("send-otp")
  sendOtp(@Body() data: RegisterEmail){
    return this.userService.sendOtp(data)
  }

  @Post("register")
  register(@Body() data: CreateUserDto){
    return this.userService.register(data)
  }

  @Post("verify-otp")
  verify(@Body() data: VerifyEmail){
    return this.userService.verifyEmail(data)
  }

  @Post("login")
  login(@Body() data: LoginDto){
    return this.userService.login(data)
  }

  @Post("resend-otp")
  resendOtp(@Body() data: RegisterEmail){
    return this.userService.resendOtp(data)
  }
}


