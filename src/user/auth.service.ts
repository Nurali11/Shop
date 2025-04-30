import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import {totp} from "otplib"
import { MailService } from 'src/mail/mail.service';
import { RegisterEmail, VerifyEmail } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
totp.options = {digits: 5, step: 300}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailService,
    private jwt: JwtService
  ){}

  async sendOtp(data: RegisterEmail){
    try {
      const existingUser = await this.prisma.user.findFirst({where: {email: data.email}})
      if(existingUser){
        throw new BadRequestException("User with such an eamil already exists")
      }

      
      this.resendOtp(data)
      
      await this.prisma.user.create({data: {
        email: data.email
      }})

      return `Otp is sent to your email! ${data.email}`
    } catch (error) {
      return {message: error.message}
    }
  }

  async verifyEmail(data: VerifyEmail){
    try {
      let user = await this.prisma.user.findFirst({where: {email: data.email}})
      if(!user){
        throw new BadRequestException("User not found")
      }

      let match = totp.verify({token: data.otp, secret: data.email + "sekret_otp"})

        if(!match){
          throw new BadRequestException("Otp is wrong")
        }

      await this.prisma.user.update({where: {email: data.email}, data: {status: "ACTIVE"}})

        return {message: "Successfullt verified! Now register"}
    } catch (error) {
      return {message: error.message}
    }
  }
  async register(data: CreateUserDto){
    try {
      const {password, email, ...rest} = data 
      const existingUser = await this.prisma.user.findFirst({where: {email}})
      if(!existingUser){
        throw new BadRequestException("Firstly use /send-otp to create account")
      }

      if(existingUser.status == "INACTIVE"){
        throw new BadRequestException("Verify your email first")
      }
      let region = await this.prisma.region.findFirst({where: {id: data.regionId}})
      if(!region){
        throw new BadRequestException(`Region with ${data.regionId} id not found`)
      }
      
      let hash = bcrypt.hashSync(password, 10)
  
      let newUser = await this.prisma.user.update({
        where: {email},
        data: {
          ...rest,
          email,
          password: hash
        }
      })

      return newUser
    } catch (error) {
      return {message: error.message}
    }
  }

  async login(data: LoginDto){
    try {
      let user = await this.prisma.user.findFirst({where: {email: data.email}})
      if(!user){
        throw new NotFoundException("User not found")
      }

      let match = bcrypt.compareSync(data.password, user.password)
      if(!match){
        throw new BadRequestException("Password is wrong")
      }

      let access_token = this.jwt.sign({id: user.id, role: user.role}, {secret: "access"})
      let refresh_token = this.jwt.sign({id: user.id}, {secret: "refresh"})

      return {access_token, refresh_token}
    } catch (error) {
      return {message: error.message}
    }
  }

  async resendOtp(data: RegisterEmail){
    try {
      let otp = totp.generate(data.email + "sekret_otp")
      await this.mailer.sendMail(data.email, 'Verify your email', otp)

      console.log(otp);

      return `Otp is resent to your email! ${data.email}`
    } catch (error) {
      return {message: error.message}
    }
  }
}
