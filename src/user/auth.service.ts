import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import {totp} from "otplib"
import { MailService } from 'src/mail/mail.service';
import { RegisterEmail, VerifyEmail } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetDto } from './dto/reset-password.dto';
import { Request } from 'express';
const DeviceDetector = require("device-detector-js");
totp.options = {digits: 5, step: 300}
const deviceDetector = new DeviceDetector()

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
      throw new BadRequestException({message: error.message})
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
      throw new BadRequestException({message: error.message})
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
      if(data.regionId){
        let region = await this.prisma.region.findFirst({where: {id: data.regionId}})
        if(!region){
          throw new BadRequestException(`Region with ${data.regionId} id not found`)
        }

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
      throw new BadRequestException({message: error.message})
    }
  }

  async login(data: LoginDto, req: any){
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

      let device = deviceDetector.parse(req.headers["user-agent"])

      let existing = await this.prisma.sessions.findFirst({where: {userId: user.id, device: {
        equals: device
      }}})
      if(!existing){
        let session = await this.prisma.sessions.create({data: {device, userId: user.id}})
      }

      return {access_token, refresh_token}
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async resendOtp(data: RegisterEmail){
    try {
      let otp = totp.generate(data.email + "sekret_otp")
      await this.mailer.sendMail(data.email, 'Verify your email', otp)

      console.log(otp);

      return `Otp is resent to your email! ${data.email}`
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async resetPassword(data: ResetDto, req: Request){
    try {
      let user = await this.prisma.user.findFirst({where: {id: req['user'].id}})
      if(!user){
        throw new BadRequestException("User not found")
      }
  
      let match = bcrypt.compareSync(data.old_password, user.password)
      if(!match){
        throw new BadRequestException("Old password is incorrect")
      }
      let newHashed = bcrypt.hashSync(data.new_password, 10)
      let updated = await this.prisma.user.update({where: {id: user.id}, data: {
        password: newHashed
      }})
  
      return {
        message: `You password successfully reset! You new password - ${data.new_password}`,
        data:updated
      }
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }

  }

  async addAdminOrSuper(data: CreateAdminDto, req: Request){
    try {
      if(req['user'].role != "ADMIN"){
        throw new BadRequestException("You cannot add new admin! ONly admin can add another admin")
      }
      let newAdmin = await this.prisma.user.create({
        data: {
          ...data
        }
      })

      return newAdmin
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
