import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { ViewsService } from 'src/views/views.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private view: ViewsService
  ){}
  async create(data: CreateProductDto, req: Request) {
    try {
      
      let user = await this.prisma.user.findFirst({where: {id: req['user'].id}})
      if(!user){
        throw new BadRequestException(`User with ${req['user'].id} id not found`)
      }

      let category = await this.prisma.category.findFirst({where: {id: data.categoryId}})
      if(!category){
        throw new BadRequestException(`Category with ${data.categoryId} id not found`)
      }
      let newPrd = await this.prisma.product.create({
        data: {
          ...data,
          userId: req['user'].id,
          colors: {
            connect: data.colors.map((id)=> ({id}))
          }
        }
      })
      return newPrd
    } catch (error) {
      return error.message
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.product.findMany({
        include: {
          Views: true,
          colors: true
        }
      })
      let allWithCounts = all.map(product => ({
        ...product,
        viewsCount: product.Views.length
      }));
      return allWithCounts
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: number, req: Request) {
    try {
      let one = await this.prisma.product.findFirst({where :{id}})
      if(!one){
        throw new BadRequestException(`Product with ${id} id not  found`)
      }
      await this.view.create({productId: one.id}, req)
      return one
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: number, data: UpdateProductDto) {
    try {
      let updated = await this.prisma.product.update({where: 
        {id},
        data:{
          ...data,
          colors: data.colors
          ? {
              set: data.colors.map(id => ({ id })),
            }
          : undefined,
        }})
      if(!updated){
        throw new BadRequestException(`Product with ${id} id not  found`)
      }
      return updated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.product.delete({where: {id}})
      if(!deleted){
        throw new BadRequestException(`Product with ${id} id not  found`)
      }
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
