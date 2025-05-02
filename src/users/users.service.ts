import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { contains } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ){}
  async findAll(firstName: string, lastName: string, year:string, email:string) {
    try {
      const filter: any = {}
      if(firstName){
        filter.firstName = {contains: firstName, }
      }
      let all = await this.prisma.user.findMany({
        where: {
          firstName: {contains: firstName, mode: "insensitive"},
          lastName: {contains: lastName, mode: "insensitive"},
          year: year,
          email: {contains: email, mode: "insensitive"}
        }
      })
      return all
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.user.findFirst({where: {id}})
      return one
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async update(id: number, data: UpdateUserDto, req: Request) {
    try {
      if(req['user'].role != "ADMIN" && req['user'].id == id){
        throw new BadRequestException("You cannot updated othes account! Only ADMIN or SUPER-ADMIN can!")
      }
      let update = await this.prisma.user.update({where: {id}, data})
      return update
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      if(req['user'].role != "ADMIN" && req['user'].id == id){
        throw new BadRequestException("You cannot delete others account! Only ADMIN or SUPER-ADMIN can!")
      }
      let deleted = await this.prisma.user.delete({where: {id}})
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
