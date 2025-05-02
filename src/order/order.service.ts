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

  async findAll() {
    try {
      let orders = await this.prisma.order.findMany()
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number) {
    try {
      
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
