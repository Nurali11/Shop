import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ){}
  async findAll() {
    try {
      let all = await this.prisma.user.findMany()
      return all
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.user.findFirst({where: {id}})
      return one
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      let update = await this.prisma.user.update({where: {id}, data})
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.user.delete({where: {id}})
    } catch (error) {
      return {message: error.message}
    }
  }
}
