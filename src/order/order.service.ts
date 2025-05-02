import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateOrderDto, req: Request) {
    try {
      let colorCheck = await this.prisma.product.findFirst({where: {id: data.productId}, include: {colors: true}})
      let colorIds = colorCheck?.colors.map((a) => a.id)
      console.log(colorIds);
      
      if(!colorIds?.includes(data.colorId)){
        throw new BadRequestException("THe product does not have such a color")
      }

      let prd = await this.prisma.product.findFirst({where: {id: data.productId}})

      if(!prd){
        throw new BadRequestException("Product not found")
      }

      let order = await this.prisma.order.create({
        data: {
          productId: data.productId,
          count: data.count,
          colorId: data.colorId,
          userId: req['user'].id
        }
      })

      let countMinus = await this.prisma.product.update({
        where: {id: data.productId},
        data: {
          count: prd.count - data.count
        }
      })
      return order
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findAll(productId: number, userId: number) {
    try {
      let orders = await this.prisma.order.findMany({
        where: {
          productId: productId || {},
          userId: userId || {},
        }
      })
      return orders
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findOne(id: number) {
    try {
      
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async update(id: number, data: UpdateOrderDto, req: Request) {
    try {
      let find = await this.prisma.order.findFirst({where: {id}})
      if(!["SUPER-ADMIN", 'ADMIN'].includes(req['user'].role) && req['user'].id == find?.userId){
        throw new BadRequestException("You cannot update others order! Only ADMIN or SUPER-ADMIN can update others order")
      }

      let updated = await this.prisma.order.update({where: {id}, data})
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number, req: Request) {
    try {
      let find = await this.prisma.order.findFirst({where: {id}})
      if(!['ADMIN'].includes(req['user'].role) && req['user'].id == find?.userId){
        throw new BadRequestException("You cannot update others order! Only ADMIN or SUPER-ADMIN can update others order")
      }

      let deleted =await this.prisma.order.delete({where: {id}})
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
