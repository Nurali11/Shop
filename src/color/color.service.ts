import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateColorDto) {
    try {
      let newColor = await this.prisma.color.create({data})
      return newColor
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.color.findMany()
      return all
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.color.findFirst({where: {id}})
      return one
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: number, data: UpdateColorDto) {
    try {
      let updated = await this.prisma.color.update({where: {id}, data})
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.color.delete({where: {id}})
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
