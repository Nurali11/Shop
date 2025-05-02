import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './auth.service';
import { CreateAdminDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterEmail, VerifyEmail } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ResetDto } from './dto/reset-password.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

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
  login(@Body() data: LoginDto, @Req() req: any){
    return this.userService.login(data, req)
  }

  @Post("resend-otp")
  resendOtp(@Body() data: RegisterEmail){
    return this.userService.resendOtp(data)
  }

  @UseGuards(AuthGuard)
  @Post("reset-password")
  resetPassword(@Body() data: ResetDto, @Req() req: Request){
    return this.userService.resetPassword(data, req)
  }

  @UseGuards(AuthGuard)
  @Post("addAdmin")
  addAdmin(@Body() data: CreateAdminDto, @Req() req: Request){
    return this.userService.addAdminOrSuper(data, req)
  }
}