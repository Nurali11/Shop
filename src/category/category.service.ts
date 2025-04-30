import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateCategoryDto) {
    try {
      let newCtgr = await this.prisma.category.create({data})
      return newCtgr
    } catch (error) {
      return { message: error.message}
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.category.findMany()
      return all
    } catch (error) {
      return { message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.category.findFirst({where: {id}})
      return one
    } catch (error) {
      return { message: error.message}
    }
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      let updated = await this.prisma.category.update({where: {id}, data})
      return updated
    } catch (error) {
      return { message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.category.delete({where: {id}})
      return deleted
    } catch (error) {
      return { message: error.message}
    }
  }
}
